'use client';
import { Github, Mail, Tv, MessageCircle, ArrowUpRight } from "lucide-react";


export function SocialLinks () {
    const SocialLinks = [
    {name: 'Email', href: 'mailto:3429236231@qq.com', icon: Mail },
    {name: 'GitHub', href: 'https://github.com/WNN6231', secondaryHref: 'https://mail.qq.com/', icon: Github },
    {name: 'Bilibili', href: 'https://space.bilibili.com/1724227452', icon: Tv},
    {name: 'WeChat', href: '#', icon: MessageCircle},
    ]


    return(
        <div className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
            {SocialLinks.map((link) => (
            <a 
                key={link.name} 
                href={link.href} 
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white border-b border-zinc-200 dark:border-zinc-800 hover:border-zinc-900 dark:hover:border-white transition-all text-sm pb-0.5"
            >
                <link.icon size={16} className="mr-1.5" />
                <span>{link.name}</span>
                <ArrowUpRight size={14} className="ml-0.5 opacity-50 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
            ))}
        </div>
    )
}
