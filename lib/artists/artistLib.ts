import { ArtistItem } from '../../interfaces/cards';

export const cardItems: ArtistItem[] = [
  {
    anchorLink: '#stygian',
    img: 'https://ipfs.io/ipfs/QmZhz6DPF8bPLK6UmowYqq1tvga41oZp8pt7Gzwqoc862t?filename=1.mp4',
    title: 'Stygian',
    body: 'Stygian designs animated and non-animated visual artwork   ',
    pageLink: "/artists/stygian",
    isImage: false
  },
  /*
  {
    anchorLink: '#enso',
    img: 'https://ipfs.io/ipfs/QmZhz6DPF8bPLK6UmowYqq1tvga41oZp8pt7Gzwqoc862t?filename=1.mp4',
    title: 'Enso',
    body: 'Enso writes musical art',
    pageLink: "/artists/enso",
    isImage: false
  },
  */
  {
    anchorLink: '#enso',
    img: '/enso.png',
    title: 'Enso',
    body: 'Enso writes musical art',
    pageLink: "/artists/enso",
    isImage: true
  },
  {
    anchorLink: '#emeraldcitizen',
    img: '/ecitizen.png',
    title: 'Emerald Citizen',
    body: 'Emerald Citizen writes lo-fi music',
    pageLink: "/artists/emeraldcitizen",
    isImage: true

  },
]