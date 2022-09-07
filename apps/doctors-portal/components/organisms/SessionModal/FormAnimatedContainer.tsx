import { motion } from "framer-motion";
import React from "react";

export const FormAnimatedContainer: React.FC = (props) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
        >
            {props.children}
        </motion.div>
    );
};
