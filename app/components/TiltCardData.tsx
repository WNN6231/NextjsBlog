import type { ReactNode } from 'react';

export interface AnimeCard {
  id: string;
  slug: string;
  image: string;
  /** 带排版的展示标题（含副标题与换行），用于卡片与详情页渲染 */
  title: ReactNode;
  /** 纯文本主标题，用于 metadata 与 img alt */
  plainTitle: string;
  author: string;
}

export const CARDS: AnimeCard[] = [
  {
    id: '1',
    slug: 'kaguya',
    image: '/9e0047d8d587ab8029ba040d5ef43073395143382.webp',
    title: <>『超时空辉夜姬！』<br />跨越8000年的爱恋</>,
    plainTitle: '『超时空辉夜姬！』',
    author: '山下清悟',
  },
  {
    id: '2',
    slug: 'liz-bluebird',
    image: '/20260220_022429.webp',
    title: <>『利兹与青鸟』<br />我在人声鼎沸中望向你</>,
    plainTitle: '『利兹与青鸟』',
    author: '山田尚子',
  },
  {
    id: '3',
    slug: 'oregairu',
    image: '/79bfe369a2fb7fc1d8e59df199f73bb9f90d1796.webp',
    title: <> 『我的青春恋爱物语果然有问题』<br />我也想要真物</>,
    plainTitle: '『我的青春恋爱物语果然有问题』',
    author: '渡航',
  },
  {
    id: '4',
    slug: 'bocchi',
    image: '/guduyaogun.webp',
    title: <>『孤独摇滚！』<br />吉他与孤独与蓝色星球🎸</>,
    plainTitle: '『孤独摇滚！』',
    author: 'はまじあき',
  },
  {
    id: '5',
    slug: 'mygo',
    image: '/mygo.webp',
    title: <>『BanG Dream! It&apos;s MyGO!!!!!』<br />这是属于，我们的歌啊😭</>,
    plainTitle: '『BanG Dream! It\'s MyGO!!!!!』',
    author: 'BanG Dream!',
  },
  {
    id: '6',
    slug: 'girls-band-cry',
    image: '/GBC2.webp',
    title: <>『GIRLS BAND CRY!』<br />一起对生活竖起中指吧！👌</>,
    plainTitle: '『GIRLS BAND CRY!』',
    author: 'TOEI ANIMATION',
  },
  {
    id: '7',
    slug: 'adachi-shimamura',
    image: '/andao.webp',
    title: <>『安达与岛村』<br />Andachi 『与』 Shimamura</>,
    plainTitle: '『安达与岛村』',
    author: '入間人間',
  },
  {
    id: '8',
    slug: 'shuukan',
    image: '/zhouci.webp',
    title: <>『一周一次买下同班同学』<br />葉月……なんで泣くの？</>,
    plainTitle: '『一周一次买下同班同学』',
    author: '羽田うさ',
  },
  {
    id: '9',
    slug: 'yurucamp',
    image: '/yyly.webp',
    title: <>『摇曳露营△』<br />ソロキャンは、自由だ</>,
    plainTitle: '『摇曳露营△』',
    author: 'あfろ',
  },
  {
    id: '10',
    slug: 'kimi-shinu',
    image: '/smjt.webp',
    title: <>『与你相恋到生命尽头』<br />きみが死ぬまで、恋をしたい</>,
    plainTitle: '『与你相恋到生命尽头』',
    author: 'あおの なち',
  },
  {
    id: '11',
    slug: 'mudan',
    image: '/mudan.webp',
    title: <>『上伊那牡丹，醉姿似百合』<br />寮長ってカワイイですね</>,
    plainTitle: '『上伊那牡丹，醉姿似百合』',
    author: '塀',
  },
  {
    id: '12',
    slug: 'hishoujo',
    image: '/frsn.webp',
    title: <>『对我垂涎欲滴的非人少女』<br />私はあなたを喰べたい</>,
    plainTitle: '『对我垂涎欲滴的非人少女』',
    author: '苗川采',
  },
  {
    id: '13',
    slug: 'dya',
    image: '/dya.webp',
    title: <>『毁掉一切，地狱再爱』<br />君から離れられないのは、私のほうだったんだ</>,
    plainTitle: '『毁掉一切，地狱再爱』',
    author: 'くわばらたもつ',
  },
  {
    id: '14',
    slug: 'ikoku-nikki',
    image: '/ygrj.webp',
    title: <>『异国日记』<br />人間は人間のことを全部わかることはできない</>,
    plainTitle: '『异国日记』',
    author: 'ヤマシタトモコ',
  },
  {
    id: '15',
    slug: 'rnr',
    image: '/lrbx.webp',
    title: <>『我怎么可能成为你的恋人，不行不行！（※不是不可能！？）』<br />恋人になれるわけないでしょ！</>,
    plainTitle: '『我怎么可能成为你的恋人，不行不行！（※不是不可能！？）』',
    author: '三上てれん',
  },
];
