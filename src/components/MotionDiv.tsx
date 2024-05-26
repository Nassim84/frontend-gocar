import React from "react";
import { motion } from "framer-motion";

interface MotionDivProps {
	children: React.ReactNode;
}

const MotionDiv: React.FC<MotionDivProps> = ({ children }) => {
	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.5 }}
		>
			{children}
		</motion.div>
	);
};

export default MotionDiv;
