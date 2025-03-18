export const animations = {
    fadeInUp: {
        hidden: { opacity: 0, y: 50 }, // Start below
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    },

    fadeInDown: {
        hidden: { opacity: 0, y: -50 }, // Start above
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    },

    fadeInLeft: {
        hidden: { opacity: 0, x: -50 }, // Start from left
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    },

    fadeInRight: {
        hidden: { opacity: 0, x: 50 }, // Start from right
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    },

    scaleUp: {
        hidden: { opacity: 0, scale: 0.8 }, // Small size
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    },

    zoomIn: {
        hidden: { opacity: 0, scale: 0.5 }, // Zoomed out
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.6, ease: "easeOut" },
        },
    },
};
