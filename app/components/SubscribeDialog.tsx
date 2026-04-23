"use client";
import { useState } from "react";
import {
  Dialog,
  DialogDescription,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/app/components/core/dialog';
import { Variants, Transition } from 'motion/react';

export function SubscribeDialog() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const submit = async () => {
    if (!email) return;
    setStatus("loading");
    const res = await fetch("/api/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    setStatus(res.ok ? "done" : "error");
  };

  const customVariants: Variants = {
    initial: { scale: 0.9, filter: 'blur(10px)', y: '100%' },
    animate: { scale: 1, filter: 'blur(0px)', y: 0 },
  };
  const customTransition: Transition = {
    type: 'spring', bounce: 0, duration: 0.4,
  };

  return (
    <Dialog variants={customVariants} transition={customTransition}>
      <DialogTrigger className='bg-zinc-950 px-4 py-2 text-sm text-white hover:bg-zinc-900 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100'>
        Subscribe
      </DialogTrigger>
      <DialogContent className='w-full max-w-md bg-white p-6 dark:bg-zinc-900'>
        <DialogHeader>
          <DialogTitle className='text-zinc-900 dark:text-white'>
            订阅博客更新
          </DialogTitle>
          <DialogDescription className='text-zinc-600 dark:text-zinc-400'>
            有新文章时会发送邮件通知你。
          </DialogDescription>
        </DialogHeader>

        {status === "done" ? (
          <p className="mt-6 text-sm text-green-600 dark:text-green-400">
            订阅成功 🎉 期待与你分享新内容！
          </p>
        ) : (
          <div className='mt-6 flex flex-col space-y-4'>
            <input
              type='email'
              value={email}
              onChange={e => setEmail(e.target.value)}
              className='h-9 w-full rounded-lg border border-zinc-200 bg-white px-3 text-base text-zinc-900 outline-hidden focus:ring-2 focus:ring-black/5 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white dark:focus:ring-white/5 sm:text-sm'
              placeholder='输入 QQ 邮箱'
            />
            {status === "error" && (
              <p className="text-xs text-red-500">提交失败，请稍后再试</p>
            )}
            <button
              onClick={submit}
              disabled={status === "loading"}
              className='inline-flex items-center justify-center self-end rounded-lg bg-black px-4 py-2 text-sm font-medium text-zinc-50 disabled:opacity-50 dark:bg-white dark:text-zinc-900'
            >
              {status === "loading" ? "提交中…" : "确认订阅"}
            </button>
          </div>
        )}

        <DialogClose />
      </DialogContent>
    </Dialog>
  );
}