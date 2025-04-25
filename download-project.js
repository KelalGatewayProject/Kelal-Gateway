const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

// Create a file to stream archive data to
const output = fs.createWriteStream("kelal-gateway-project.zip");
const archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level
});

// Listen for all archive data to be written
output.on("close", function () {
  console.log(`Archive created successfully: ${archive.pointer()} total bytes`);
  console.log("The zip file has been created. You can now download it.");
});

// Handle warnings and errors
archive.on("warning", function (err) {
  if (err.code === "ENOENT") {
    console.warn("Warning:", err);
  } else {
    throw err;
  }
});

archive.on("error", function (err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Function to recursively add files to the archive
function addDirectoryToArchive(directory, archivePath = "") {
  const files = fs.readdirSync(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = fs.statSync(filePath);

    // Skip node_modules and .git directories
    if ((file === "node_modules" || file === ".git") && stat.isDirectory()) {
      continue;
    }

    if (stat.isDirectory()) {
      addDirectoryToArchive(filePath, path.join(archivePath, file));
    } else {
      archive.file(filePath, { name: path.join(archivePath, file) });
    }
  }
}

// Add files and directories
addDirectoryToArchive(".");

// Finalize the archive
archive.finalize();
