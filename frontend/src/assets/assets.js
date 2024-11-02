import appointment_img from './appointment_img.png';
import header_img from './header_img.png';
import group_profiles from './group_profiles.png';
import profile_pic from './profile_pic.png';
import contact_image from './contact_image.png';
import about_image from './about_image.png';
import logo from './logo.png';
import dropdown_icon from './dropdown_icon.svg';
import menu_icon from './menu_icon.svg';
import cross_icon from './cross_icon.png';
import chats_icon from './chats_icon.svg';
import verified_icon from './verified_icon.svg';
import arrow_icon from './arrow_icon.svg';
import info_icon from './info_icon.svg';
import upload_icon from './upload_icon.png';
import stripe_logo from './stripe_logo.png';
import razorpay_logo from './razorpay_logo.png';

// Importing barbers' images
import barber1 from './barber1.jpg';
import barber2 from './barber2.jpg';
import barber3 from './barber3.jpg';
import barber4 from './barber4.jpg';
import barber5 from './barber5.jpg';
import barber6 from './barber6.jpg';
import barber7 from './barber7.jpg';
import barber8 from './barber8.jpg';
import barber9 from './barber9.jpg';
import barber10 from './barber10.jpg';
import barber11 from './barber11.jpeg';
import barber12 from './barber12.jpg';

// Importing icons for specialties
import haircutIcon from './haircutIcon.png';
import beardTrimIcon from './beardTrimIcon.png';
import shaveIcon from './shaveIcon.svg';
import hairStylingIcon from './hairStylingIcon.svg';
import headMassageIcon from './headMassageIcon.png';

export const assets = {
    appointment_img,
    header_img,
    group_profiles,
    logo,
    chats_icon,
    verified_icon,
    info_icon,
    profile_pic,
    arrow_icon,
    contact_image,
    about_image,
    menu_icon,
    cross_icon,
    dropdown_icon,
    upload_icon,
    stripe_logo,
    razorpay_logo
};

export const specialityData = [
    {
        speciality: 'Haircut',
        image: haircutIcon // replace with the relevant image
    },
    {
        speciality: 'Beard Trim',
        image: beardTrimIcon // replace with the relevant image
    },
    {
        speciality: 'Shave',
        image: shaveIcon // replace with the relevant image
    },
    {
        speciality: 'Hair Styling',
        image: hairStylingIcon // replace with the relevant image
    },
    {
        speciality: 'Head Massage',
        image: headMassageIcon // replace with the relevant image
    }
];


export const barbers = [
    {
        _id: 'barber1',
        name: 'John "The Razor" Smith',
        image: barber1, 
        speciality: 'Haircut',  // Adjusted to match available specialties
        experience: '8 Years',
        about: 'John is known for precision haircuts and unique styles, providing clients with the perfect look.',
        fees: 40,
        address: {
            line1: '23rd Street, King\'s Road',
            line2: 'Downtown, New York City'
        }
    },
    {
        _id: 'barber2',
        name: 'Michael "The Fade" Johnson',
        image: barber2, 
        speciality: 'Beard Trim',  // Adjusted to match available specialties
        experience: '5 Years',
        about: 'Michael specializes in sharp fades and stylish beard trims for a clean and polished look.',
        fees: 35,
        address: {
            line1: '5th Avenue, Broadway',
            line2: 'Midtown, New York City'
        }
    },
    {
        _id: 'barber3',
        name: 'Sarah "Scissorhands" Lee',
        image: barber3, 
        speciality: 'Shave',  // Adjusted to match available specialties
        experience: '6 Years',
        about: 'Sarah provides traditional shaving techniques and expert beard styling for a clean appearance.',
        fees: 50,
        address: {
            line1: '10th Street, Hudson Yards',
            line2: 'West Side, New York City'
        }
    },
    {
        _id: 'barber4',
        name: 'David "The Groomer" Brown',
        image: barber4, 
        speciality: 'Head Massage',  // Adjusted to match available specialties
        experience: '10 Years',
        about: 'David offers precision haircuts with relaxing head massages for a full grooming experience.',
        fees: 45,
        address: {
            line1: 'Main Street, Williamsburg',
            line2: 'Brooklyn, New York City'
        }
    },
    {
        _id: 'barber5',
        name: 'Emma "The Blade" Wilson',
        image: barber11, 
        speciality: 'Beard Trim',  // Adjusted to match available specialties
        experience: '4 Years',
        about: 'Emma is an expert in beard trimming and styling, creating custom looks for every client.',
        fees: 30,
        address: {
            line1: 'Broadway, SoHo',
            line2: 'Lower Manhattan, New York City'
        }
    },
    {
        _id: 'barber6',
        name: 'Jake "The Sculptor" Roberts',
        image: barber6, 
        speciality: 'Haircut',  // Adjusted to match available specialties
        experience: '7 Years',
        about: 'Jake specializes in sharp haircuts combined with traditional wet shaves.',
        fees: 50,
        address: {
            line1: '12th Avenue, Greenwich Village',
            line2: 'New York City'
        }
    },
    {
        _id: 'barber7',
        name: 'Olivia "The Stylist" Harper',
        image: barber7, 
        speciality: 'Hair Styling',  // Adjusted to match available specialties
        experience: '5 Years',
        about: 'Olivia is renowned for her intricate hair styling and expert beard grooming techniques.',
        fees: 40,
        address: {
            line1: '14th Street, Chelsea',
            line2: 'New York City'
        }
    },
    {
        _id: 'barber8',
        name: 'Chris "The Trim" Evans',
        image: barber8, 
        speciality: 'Shave',  // Adjusted to match available specialties
        experience: '9 Years',
        about: 'Chris is a master of fades and wet shaves, creating sharp, clean looks for every client.',
        fees: 55,
        address: {
            line1: 'Liberty Avenue, Brooklyn',
            line2: 'New York City'
        }
    },
    {
        _id: 'barber9',
        name: 'Ella "The Artist" Clark',
        image: barber9, 
        speciality: 'Hair Styling',  // Adjusted to match available specialties
        experience: '6 Years',
        about: 'Ella specializes in artistic haircuts and creative hair styling for both men and women.',
        fees: 45,
        address: {
            line1: 'Bleecker Street, Manhattan',
            line2: 'New York City'
        }
    },
    {
        _id: 'barber10',
        name: 'James "The Precision" Wright',
        image: barber10, 
        speciality: 'Beard Trim',  // Adjusted to match available specialties
        experience: '8 Years',
        about: 'James offers detailed beard trims and precision beard styling to give clients a polished look.',
        fees: 40,
        address: {
            line1: '5th Avenue, Times Square',
            line2: 'New York City'
        }
    },
    {
        _id: 'barber11',
        name: 'Sophia "The Classic" Hill',
        image: barber11, 
        speciality: 'Haircut',  // Adjusted to match available specialties
        experience: '7 Years',
        about: 'Sophia excels in delivering classic haircuts and clean beard trims with a modern touch.',
        fees: 50,
        address: {
            line1: 'High Street, Queens',
            line2: 'New York City'
        }
    },
    {
        _id: 'barber12',
        name: 'Liam "The Blade" Jackson',
        image: barber12, 
        speciality: 'Haircut ',  // Adjusted to match available specialties
        experience: '9 Years',
        about: 'Liam provides expert haircuts and beard grooming services, ensuring every client leaves looking sharp.',
        fees: 45,
        address: {
            line1: 'Broadway, Tribeca',
            line2: 'New York City'
        }
    },
];

