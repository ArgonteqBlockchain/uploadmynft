import { ReactNode } from 'react';

import DesignServicesTwoToneIcon from '@mui/icons-material/DesignServicesTwoTone';
import BrightnessLowTwoToneIcon from '@mui/icons-material/BrightnessLowTwoTone';
import MmsTwoToneIcon from '@mui/icons-material/MmsTwoTone';

export interface MenuItem {
  link?: string;
  icon?: ReactNode;
  badge?: string;
  items?: MenuItem[];
  name: string;
}

export interface MenuItems {
  items: MenuItem[];
  heading: string;
}

const menuItems: MenuItems[] = [
  {
    heading: 'Dashboard',
    items: [
      {
        name: 'Dashboard',
        link: '/dashboard',
        icon: DesignServicesTwoToneIcon,
      },
    ],
  },
  {
    heading: 'Content',
    items: [
      {
        name: 'Collections',
        link: '/content/collections',
        icon: BrightnessLowTwoToneIcon,
      },
      // {
      //   name: 'Transactions',
      //   icon: MmsTwoToneIcon,
      //   link: '/content/transactions',
      // },
    ],
  },
  // {
  //   heading: 'Management',
  //   items: [
  //     {
  //       name: 'Transactions',
  //       icon: TableChartTwoToneIcon,
  //       link: '/management/transactions',
  //     },
  //     {
  //       name: 'User Profile',
  //       icon: AccountCircleTwoToneIcon,
  //       link: '/management/profile',
  //       items: [
  //         {
  //           name: 'Profile Details',
  //           link: '/management/profile/details',
  //         },
  //         {
  //           name: 'User Settings',
  //           link: '/management/profile/settings',
  //         },
  //       ],
  //     },
  //   ],
  // },
  // {
  //   heading: 'Components',
  //   items: [
  //     {
  //       name: 'Buttons',
  //       icon: BallotTwoToneIcon,
  //       link: '/components/buttons',
  //     },
  //     {
  //       name: 'Modals',
  //       icon: BeachAccessTwoToneIcon,
  //       link: '/components/modals',
  //     },
  //     {
  //       name: 'Accordions',
  //       icon: EmojiEventsTwoToneIcon,
  //       link: '/components/accordions',
  //     },
  //     {
  //       name: 'Tabs',
  //       icon: FilterVintageTwoToneIcon,
  //       link: '/components/tabs',
  //     },
  //     {
  //       name: 'Badges',
  //       icon: HowToVoteTwoToneIcon,
  //       link: '/components/badges',
  //     },
  //     {
  //       name: 'Tooltips',
  //       icon: LocalPharmacyTwoToneIcon,
  //       link: '/components/tooltips',
  //     },
  //     {
  //       name: 'Avatars',
  //       icon: RedeemTwoToneIcon,
  //       link: '/components/avatars',
  //     },
  //     {
  //       name: 'Cards',
  //       icon: SettingsTwoToneIcon,
  //       link: '/components/cards',
  //     },
  //     {
  //       name: 'Forms',
  //       icon: TrafficTwoToneIcon,
  //       link: '/components/forms',
  //     },
  //   ],
  // },
  // {
  //   heading: 'Extra Pages',
  //   items: [
  //     {
  //       name: 'Status',
  //       icon: VerifiedUserTwoToneIcon,
  //       link: '/status',
  //       items: [
  //         {
  //           name: 'Error 404',
  //           link: '/status/404',
  //         },
  //         {
  //           name: 'Error 500',
  //           link: '/status/500',
  //         },
  //         {
  //           name: 'Maintenance',
  //           link: '/status/maintenance',
  //         },
  //         {
  //           name: 'Coming Soon',
  //           link: '/status/coming-soon',
  //         },
  //       ],
  //     },
  //   ],
  // },
];

export default menuItems;
