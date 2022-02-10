import { ActivityIcon, CheckCircleIcon} from "../components/assets"

export const navigation = [
    {
        id: 0,
        label: 'Activity',
        path: '#',
        logo: <ActivityIcon/>,
        position: 'top'
    },
    {
        id: 1,
        label: 'My Tickets',
        path: '#',
        logo: <CheckCircleIcon className="w-6 h-6  fill-red-500"/>,
        position: 'top'
    },
    /* 
     ***** Bottom navigation
     *****
     */

    {
        id: 2,
        label: 'Overview',
        path: '#',
        logo: <div className='w-5'/>,
        position: 'bottom'
    },
    {
        id: 3,
        label: 'Projects',
        path: '#',
        logo: <div className='w-5'/>,
        position: 'bottom'
    },
    {
        id: 4,
        label: 'Calendar',
        path: '#',
        logo: <div className='w-5'/>,
        position: 'bottom'
    },
    {
        id: 5,
        label: 'Campaign',
        path: '#',
        logo: <div className='w-5'/>,
        position: 'bottom'
    },
    {
        id: 6,
        label: 'Team',
        path: '#',
        logo: <div className='w-5'/>,
        position: 'bottom'
    },
    {
        id: 7,
        label: 'Analytics',
        path: '#',
        logo: <div className='w-5'/>,
        position: 'bottom'
    },
]