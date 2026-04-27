import { motion } from 'framer-motion';
import React from 'react';

// Define las variantes de la animación
const animations = {
    initial: { opacity: 0 }, 
    animate: { opacity: 1},    
    exit: { opacity: 0, },  
};

export const AnimatedPage = ({ children }: { children: React.ReactNode }) => {
    return (
        <motion.div variants={animations} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.3 }} className='animatedPage'>
            {children}
        </motion.div>
    );
};