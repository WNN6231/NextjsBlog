"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);
    if (!mounted) return null;

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 hover:scale-110 transition-transform"
        >
            <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180}}
            >
                {theme === "dark" ? (
                    <Moon size={18} className="text-zinc-400" />
                ) : (
                    <Sun size={18} className="text-orange-400" />
                )}
            </motion.div>
        </button>
    )
}