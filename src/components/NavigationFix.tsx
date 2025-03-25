import { useEffect } from "react";

/**
 * This component applies fixes to ensure navigation works correctly
 */
const NavigationFix = () => {
  useEffect(() => {
    // Fix for any potential event capturing issues
    const fixNavigationIssues = () => {
      // Make sure all clickable elements have proper event handling
      document
        .querySelectorAll(
          'a, button, [role="button"], .cursor-pointer, input, select, textarea',
        )
        .forEach((el) => {
          if (!el.getAttribute("data-nav-fixed")) {
            el.setAttribute("data-nav-fixed", "true");
            el.setAttribute(
              "style",
              "position: relative; z-index: 10; pointer-events: auto !important;",
            );
          }
        });
    };

    // Run the fix immediately and then periodically
    fixNavigationIssues();
    const interval = setInterval(fixNavigationIssues, 500);

    return () => clearInterval(interval);
  }, []);

  return null;
};

export default NavigationFix;
