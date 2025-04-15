cmake_minimum_required(VERSION 3.13)

# Define the library name
project(kelalgateway)

# Configure C++ standard
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)
set(CMAKE_CXX_EXTENSIONS OFF)

# Enable RTTI and Exceptions
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -frtti -fexceptions")

include_directories(
    ../node_modules/react-native/ReactCommon
    ../node_modules/react-native/ReactAndroid/src/main/jni/first-party/fbjni/headers
)

add_library(${PROJECT_NAME} SHARED
    ${REACT_ANDROID_DIR}/src/main/jni/first-party/fb/jni/OnLoad.cpp
)

target_link_libraries(${PROJECT_NAME}
    android
    log
) 