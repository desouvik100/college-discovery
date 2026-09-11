import { PrismaClient, CollegeType, Category } from "@prisma/client";
import { randomUUID } from "crypto";

const prisma = new PrismaClient();

interface CollegeSeed {
  name: string;
  state: string;
  city: string;
  establishedYear: number;
  collegeType: CollegeType;
  rating: number;
  totalFees: number;
  isMedical?: boolean;
  tier: 1 | 2 | 3;
  imageUrl?: string;
  imageAlt?: string;
  imageSourceUrl?: string;
  websiteUrl?: string;
}

const COLLEGES_DATA: CollegeSeed[] = [
  {
    name: "Indian Institute of Technology Bombay",
    state: "Maharashtra",
    city: "Mumbai",
    establishedYear: 1958,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.9,
    totalFees: 850000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/IITB_Main_Building.jpg/800px-IITB_Main_Building.jpg",
    imageAlt: "IIT Bombay Main Building, Powai Campus",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:IITB_Main_Building.jpg",
    websiteUrl: "https://www.iitb.ac.in",
  },
  {
    name: "Indian Institute of Technology Delhi",
    state: "Delhi",
    city: "New Delhi",
    establishedYear: 1961,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.9,
    totalFees: 860000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/IIT_Delhi_Main_Building.jpg/800px-IIT_Delhi_Main_Building.jpg",
    imageAlt: "IIT Delhi Administrative and Academic Building, Hauz Khas",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:IIT_Delhi_Main_Building.jpg",
    websiteUrl: "https://home.iitd.ac.in",
  },
  {
    name: "Indian Institute of Technology Madras",
    state: "Tamil Nadu",
    city: "Chennai",
    establishedYear: 1959,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.9,
    totalFees: 820000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/IIT_Madras_Heritage_Centre.jpg/800px-IIT_Madras_Heritage_Centre.jpg",
    imageAlt: "IIT Madras Heritage Building and Campus",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:IIT_Madras_Heritage_Centre.jpg",
    websiteUrl: "https://www.iitm.ac.in",
  },
  {
    name: "Indian Institute of Technology Kharagpur",
    state: "West Bengal",
    city: "Kharagpur",
    establishedYear: 1951,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.8,
    totalFees: 840000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/IIT_KGP_Tower.jpg/800px-IIT_KGP_Tower.jpg",
    imageAlt: "IIT Kharagpur Historic Main Building Tower",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:IIT_KGP_Tower.jpg",
    websiteUrl: "http://www.iitkgp.ac.in",
  },
  {
    name: "Indian Institute of Technology Kanpur",
    state: "Uttar Pradesh",
    city: "Kanpur",
    establishedYear: 1959,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.8,
    totalFees: 830000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/IIT_Kanpur_Aerospace_Engineering_Building.jpg/800px-IIT_Kanpur_Aerospace_Engineering_Building.jpg",
    imageAlt: "IIT Kanpur Campus Academic Building",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:IIT_Kanpur_Aerospace_Engineering_Building.jpg",
    websiteUrl: "https://www.iitk.ac.in",
  },
  {
    name: "Indian Institute of Technology Roorkee",
    state: "Uttarakhand",
    city: "Roorkee",
    establishedYear: 1847,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.7,
    totalFees: 820000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/IIT_Roorkee_Main_Building.jpg/800px-IIT_Roorkee_Main_Building.jpg",
    imageAlt: "IIT Roorkee Historic Thomason College Main Building",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:IIT_Roorkee_Main_Building.jpg",
    websiteUrl: "https://www.iitr.ac.in",
  },
  {
    name: "Indian Institute of Technology Guwahati",
    state: "Assam",
    city: "Guwahati",
    establishedYear: 1994,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.7,
    totalFees: 810000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/IIT_Guwahati_Administration_Building.jpg/800px-IIT_Guwahati_Administration_Building.jpg",
    imageAlt: "IIT Guwahati Administrative Complex and Lakefront",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:IIT_Guwahati_Administration_Building.jpg",
    websiteUrl: "https://www.iitg.ac.in",
  },
  { name: "Indian Institute of Technology (BHU) Varanasi", state: "Uttar Pradesh", city: "Varanasi", establishedYear: 1919, collegeType: CollegeType.GOVERNMENT, rating: 4.6, totalFees: 830000, tier: 1 },
  {
    name: "Indian Institute of Technology Hyderabad",
    state: "Telangana",
    city: "Hyderabad",
    establishedYear: 2008,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.7,
    totalFees: 850000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Academic_Block_A%2C_IIT_Hyderabad.jpg/800px-Academic_Block_A%2C_IIT_Hyderabad.jpg",
    imageAlt: "IIT Hyderabad Modern Academic Block",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Academic_Block_A,_IIT_Hyderabad.jpg",
    websiteUrl: "https://www.iith.ac.in",
  },
  { name: "Indian Institute of Technology Indore", state: "Madhya Pradesh", city: "Indore", establishedYear: 2009, collegeType: CollegeType.GOVERNMENT, rating: 4.5, totalFees: 820000, tier: 2 },
  { name: "Indian Institute of Technology Gandhinagar", state: "Gujarat", city: "Gandhinagar", establishedYear: 2008, collegeType: CollegeType.GOVERNMENT, rating: 4.5, totalFees: 830000, tier: 2 },
  { name: "Indian Institute of Technology Ropar", state: "Punjab", city: "Rupnagar", establishedYear: 2008, collegeType: CollegeType.GOVERNMENT, rating: 4.4, totalFees: 820000, tier: 2 },
  { name: "Indian Institute of Technology Patna", state: "Bihar", city: "Patna", establishedYear: 2008, collegeType: CollegeType.GOVERNMENT, rating: 4.4, totalFees: 810000, tier: 2 },
  { name: "Indian Institute of Technology Bhubaneswar", state: "Odisha", city: "Bhubaneswar", establishedYear: 2008, collegeType: CollegeType.GOVERNMENT, rating: 4.4, totalFees: 820000, tier: 2 },
  { name: "Indian Institute of Technology (ISM) Dhanbad", state: "Jharkhand", city: "Dhanbad", establishedYear: 1926, collegeType: CollegeType.GOVERNMENT, rating: 4.5, totalFees: 840000, tier: 2 },
  { name: "Indian Institute of Technology Jodhpur", state: "Rajasthan", city: "Jodhpur", establishedYear: 2008, collegeType: CollegeType.GOVERNMENT, rating: 4.3, totalFees: 810000, tier: 2 },
  { name: "Indian Institute of Technology Tirupati", state: "Andhra Pradesh", city: "Tirupati", establishedYear: 2015, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 800000, tier: 2 },

  // --- PREMIER NITs (JEE_MAIN) ---
  {
    name: "National Institute of Technology Tiruchirappalli",
    state: "Tamil Nadu",
    city: "Tiruchirappalli",
    establishedYear: 1964,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.7,
    totalFees: 620000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/NIT_Trichy_Admin_Building.jpg/800px-NIT_Trichy_Admin_Building.jpg",
    imageAlt: "NIT Trichy Administrative Building",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:NIT_Trichy_Admin_Building.jpg",
    websiteUrl: "https://www.nitt.edu",
  },
  {
    name: "National Institute of Technology Karnataka",
    state: "Karnataka",
    city: "Surathkal",
    establishedYear: 1960,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.7,
    totalFees: 640000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/NITK_Main_Building.jpg/800px-NITK_Main_Building.jpg",
    imageAlt: "NIT Karnataka Main Building, Surathkal",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:NITK_Main_Building.jpg",
    websiteUrl: "https://www.nitk.ac.in",
  },
  {
    name: "National Institute of Technology Warangal",
    state: "Telangana",
    city: "Warangal",
    establishedYear: 1959,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.6,
    totalFees: 630000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/NIT_Warangal_Administrative_Building.jpg/800px-NIT_Warangal_Administrative_Building.jpg",
    imageAlt: "NIT Warangal Administrative Building",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:NIT_Warangal_Administrative_Building.jpg",
    websiteUrl: "https://www.nitw.ac.in",
  },
  {
    name: "National Institute of Technology Calicut",
    state: "Kerala",
    city: "Kozhikode",
    establishedYear: 1961,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.4,
    totalFees: 600000,
    tier: 2,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/NIT_Calicut_Administrative_Block.jpg/800px-NIT_Calicut_Administrative_Block.jpg",
    imageAlt: "NIT Calicut Administrative Block",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:NIT_Calicut_Administrative_Block.jpg",
    websiteUrl: "https://www.nitc.ac.in",
  },
  { name: "Motilal Nehru National Institute of Technology", state: "Uttar Pradesh", city: "Prayagraj", establishedYear: 1961, collegeType: CollegeType.GOVERNMENT, rating: 4.4, totalFees: 620000, tier: 2 },
  { name: "National Institute of Technology Durgapur", state: "West Bengal", city: "Durgapur", establishedYear: 1960, collegeType: CollegeType.GOVERNMENT, rating: 4.3, totalFees: 590000, tier: 2 },
  { name: "Malaviya National Institute of Technology", state: "Rajasthan", city: "Jaipur", establishedYear: 1963, collegeType: CollegeType.GOVERNMENT, rating: 4.4, totalFees: 620000, tier: 2 },
  { name: "Visvesvaraya National Institute of Technology", state: "Maharashtra", city: "Nagpur", establishedYear: 1960, collegeType: CollegeType.GOVERNMENT, rating: 4.3, totalFees: 610000, tier: 2 },
  { name: "Sardar Vallabhbhai National Institute of Technology", state: "Gujarat", city: "Surat", establishedYear: 1961, collegeType: CollegeType.GOVERNMENT, rating: 4.3, totalFees: 600000, tier: 2 },
  { name: "National Institute of Technology Kurukshetra", state: "Haryana", city: "Kurukshetra", establishedYear: 1963, collegeType: CollegeType.GOVERNMENT, rating: 4.3, totalFees: 620000, tier: 2 },
  { name: "Maulana Azad National Institute of Technology", state: "Madhya Pradesh", city: "Bhopal", establishedYear: 1960, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 590000, tier: 2 },
  { name: "National Institute of Technology Silchar", state: "Assam", city: "Silchar", establishedYear: 1967, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 580000, tier: 2 },
  { name: "Dr. B R Ambedkar National Institute of Technology", state: "Punjab", city: "Jalandhar", establishedYear: 1989, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 590000, tier: 2 },
  { name: "National Institute of Technology Hamirpur", state: "Himachal Pradesh", city: "Hamirpur", establishedYear: 1986, collegeType: CollegeType.GOVERNMENT, rating: 4.1, totalFees: 580000, tier: 2 },
  { name: "National Institute of Technology Raipur", state: "Chhattisgarh", city: "Raipur", establishedYear: 1956, collegeType: CollegeType.GOVERNMENT, rating: 4.1, totalFees: 570000, tier: 2 },
  { name: "National Institute of Technology Patna", state: "Bihar", city: "Patna", establishedYear: 1886, collegeType: CollegeType.GOVERNMENT, rating: 4.1, totalFees: 580000, tier: 2 },
  { name: "National Institute of Technology Goa", state: "Goa", city: "Ponda", establishedYear: 2010, collegeType: CollegeType.GOVERNMENT, rating: 4.0, totalFees: 590000, tier: 2 },
  { name: "National Institute of Technology Jamshedpur", state: "Jharkhand", city: "Jamshedpur", establishedYear: 1960, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 600000, tier: 2 },

  // --- PREMIER IIITs (JEE_MAIN) ---
  {
    name: "International Institute of Information Technology Hyderabad",
    state: "Telangana",
    city: "Hyderabad",
    establishedYear: 1998,
    collegeType: CollegeType.DEEMED,
    rating: 4.8,
    totalFees: 1550000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/IIIT_Hyderabad_Campus.jpg/800px-IIIT_Hyderabad_Campus.jpg",
    imageAlt: "IIIT Hyderabad Academic Complex Gachibowli",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:IIIT_Hyderabad_Campus.jpg",
    websiteUrl: "https://www.iiit.ac.in",
  },
  { name: "International Institute of Information Technology Bangalore", state: "Karnataka", city: "Bengaluru", establishedYear: 1999, collegeType: CollegeType.DEEMED, rating: 4.6, totalFees: 1600000, tier: 1 },
  {
    name: "Indraprastha Institute of Information Technology Delhi",
    state: "Delhi",
    city: "New Delhi",
    establishedYear: 2008,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.6,
    totalFees: 1700000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/IIITD_Academic_Building.jpg/800px-IIITD_Academic_Building.jpg",
    imageAlt: "Indraprastha Institute of Information Technology Delhi Campus",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:IIITD_Academic_Building.jpg",
    websiteUrl: "https://www.iiitd.ac.in",
  },
  { name: "Indian Institute of Information Technology Allahabad", state: "Uttar Pradesh", city: "Prayagraj", establishedYear: 1999, collegeType: CollegeType.GOVERNMENT, rating: 4.5, totalFees: 720000, tier: 1 },
  { name: "Atal Bihari Vajpayee IIITM Gwalior", state: "Madhya Pradesh", city: "Gwalior", establishedYear: 1997, collegeType: CollegeType.GOVERNMENT, rating: 4.3, totalFees: 680000, tier: 2 },
  { name: "Indian Institute of Information Technology Jabalpur", state: "Madhya Pradesh", city: "Jabalpur", establishedYear: 2005, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 650000, tier: 2 },
  { name: "Indian Institute of Information Technology Lucknow", state: "Uttar Pradesh", city: "Lucknow", establishedYear: 2015, collegeType: CollegeType.GOVERNMENT, rating: 4.4, totalFees: 890000, tier: 2 },
  { name: "Indian Institute of Information Technology Sri City", state: "Andhra Pradesh", city: "Chittoor", establishedYear: 2013, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 950000, tier: 2 },
  { name: "Indian Institute of Information Technology Guwahati", state: "Assam", city: "Guwahati", establishedYear: 2013, collegeType: CollegeType.GOVERNMENT, rating: 4.1, totalFees: 820000, tier: 2 },

  // --- PREMIER STATE & CENTRAL GOVERNMENT UNIVERSITIES (JEE_MAIN / STATE) ---
  {
    name: "Delhi Technological University",
    state: "Delhi",
    city: "New Delhi",
    establishedYear: 1941,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.5,
    totalFees: 480000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/DTU_Main_Gate.jpg/800px-DTU_Main_Gate.jpg",
    imageAlt: "Delhi Technological University Campus Entrance and Academic Blocks",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:DTU_Main_Gate.jpg",
    websiteUrl: "http://www.dtu.ac.in",
  },
  { name: "Netaji Subhas University of Technology", state: "Delhi", city: "New Delhi", establishedYear: 1983, collegeType: CollegeType.GOVERNMENT, rating: 4.4, totalFees: 460000, tier: 1 },
  {
    name: "Jadavpur University",
    state: "West Bengal",
    city: "Kolkata",
    establishedYear: 1955,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.6,
    totalFees: 40000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Aurobindo_Bhavan%2C_Jadavpur_University.jpg/800px-Aurobindo_Bhavan%2C_Jadavpur_University.jpg",
    imageAlt: "Aurobindo Bhavan, Jadavpur University Main Campus",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Aurobindo_Bhavan,_Jadavpur_University.jpg",
    websiteUrl: "http://www.jaduniv.edu.in",
  },
  {
    name: "College of Engineering Pune",
    state: "Maharashtra",
    city: "Pune",
    establishedYear: 1854,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.5,
    totalFees: 360000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/COEP_Main_Building.jpg/800px-COEP_Main_Building.jpg",
    imageAlt: "COEP Historic Main Building, Pune",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:COEP_Main_Building.jpg",
    websiteUrl: "https://www.coep.org.in",
  },
  {
    name: "Veermata Jijabai Technological Institute",
    state: "Maharashtra",
    city: "Mumbai",
    establishedYear: 1887,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.4,
    totalFees: 340000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/VJTI_Mumbai.jpg/800px-VJTI_Mumbai.jpg",
    imageAlt: "VJTI Historic Heritage Building, Matunga, Mumbai",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:VJTI_Mumbai.jpg",
    websiteUrl: "https://www.vjti.ac.in",
  },
  {
    name: "Anna University (CEG Guindy)",
    state: "Tamil Nadu",
    city: "Chennai",
    establishedYear: 1794,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.3,
    totalFees: 240000,
    tier: 2,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/College_of_Engineering%2C_Guindy_campus.jpg/800px-College_of_Engineering%2C_Guindy_campus.jpg",
    imageAlt: "College of Engineering Guindy Main Building, Anna University",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:College_of_Engineering,_Guindy_campus.jpg",
    websiteUrl: "https://www.annauniv.edu",
  },
  { name: "Institute of Chemical Technology", state: "Maharashtra", city: "Mumbai", establishedYear: 1933, collegeType: CollegeType.DEEMED, rating: 4.6, totalFees: 380000, tier: 1 },
  { name: "Punjab Engineering College", state: "Punjab", city: "Chandigarh", establishedYear: 1921, collegeType: CollegeType.GOVERNMENT, rating: 4.3, totalFees: 620000, tier: 2 },
  { name: "Jabalpur Engineering College", state: "Madhya Pradesh", city: "Jabalpur", establishedYear: 1947, collegeType: CollegeType.GOVERNMENT, rating: 3.9, totalFees: 120000, tier: 3 },
  { name: "Andhra University College of Engineering", state: "Andhra Pradesh", city: "Visakhapatnam", establishedYear: 1946, collegeType: CollegeType.GOVERNMENT, rating: 4.1, totalFees: 180000, tier: 2 },
  { name: "University College of Engineering Osmania University", state: "Telangana", city: "Hyderabad", establishedYear: 1929, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 190000, tier: 2 },
  { name: "Harcourt Butler Technical University", state: "Uttar Pradesh", city: "Kanpur", establishedYear: 1921, collegeType: CollegeType.GOVERNMENT, rating: 4.1, totalFees: 350000, tier: 2 },
  {
    name: "Indian Institute of Engineering Science and Technology Shibpur",
    state: "West Bengal",
    city: "Howrah",
    establishedYear: 1856,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.3,
    totalFees: 560000,
    tier: 2,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/IIEST_Shibpur_Main_Building.jpg/800px-IIEST_Shibpur_Main_Building.jpg",
    imageAlt: "IIEST Shibpur Heritage Main Building, Howrah",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:IIEST_Shibpur_Main_Building.jpg",
    websiteUrl: "https://www.iiests.ac.in",
  },

  // --- BITS PILANI CAMPUSES (BITSAT) ---
  {
    name: "BITS Pilani - Pilani Campus",
    state: "Rajasthan",
    city: "Pilani",
    establishedYear: 1964,
    collegeType: CollegeType.DEEMED,
    rating: 4.8,
    totalFees: 2150000,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/11/BITS_Pilani_Clock_Tower.jpg/800px-BITS_Pilani_Clock_Tower.jpg",
    imageAlt: "BITS Pilani Historic Clock Tower and Auditorium",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:BITS_Pilani_Clock_Tower.jpg",
    websiteUrl: "https://www.bits-pilani.ac.in",
  },
  { name: "BITS Pilani - K K Birla Goa Campus", state: "Goa", city: "Zuarinagar", establishedYear: 2004, collegeType: CollegeType.DEEMED, rating: 4.6, totalFees: 2150000, tier: 1 },
  { name: "BITS Pilani - Hyderabad Campus", state: "Telangana", city: "Hyderabad", establishedYear: 2008, collegeType: CollegeType.DEEMED, rating: 4.6, totalFees: 2150000, tier: 1 },

  // --- TOP PRIVATE & DEEMED INSTITUTIONS (JEE_MAIN / PRIVATE) ---
  {
    name: "Vellore Institute of Technology",
    state: "Tamil Nadu",
    city: "Vellore",
    establishedYear: 1984,
    collegeType: CollegeType.DEEMED,
    rating: 4.4,
    totalFees: 890000,
    tier: 2,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/VIT_Vellore_Technology_Tower.jpg/800px-VIT_Vellore_Technology_Tower.jpg",
    imageAlt: "VIT Vellore Technology Tower",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:VIT_Vellore_Technology_Tower.jpg",
    websiteUrl: "https://vit.ac.in",
  },
  { name: "VIT Chennai", state: "Tamil Nadu", city: "Chennai", establishedYear: 2010, collegeType: CollegeType.DEEMED, rating: 4.2, totalFees: 890000, tier: 2 },
  {
    name: "Manipal Institute of Technology",
    state: "Karnataka",
    city: "Manipal",
    establishedYear: 1957,
    collegeType: CollegeType.DEEMED,
    rating: 4.3,
    totalFees: 1780000,
    tier: 2,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/MIT_Manipal_Academic_Block_1.jpg/800px-MIT_Manipal_Academic_Block_1.jpg",
    imageAlt: "Manipal Institute of Technology Academic Complex",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:MIT_Manipal_Academic_Block_1.jpg",
    websiteUrl: "https://www.manipal.edu/mit.html",
  },
  { name: "Manipal University Bengaluru", state: "Karnataka", city: "Bengaluru", establishedYear: 2021, collegeType: CollegeType.DEEMED, rating: 4.1, totalFees: 1820000, tier: 2 },
  {
    name: "Thapar Institute of Engineering and Technology",
    state: "Punjab",
    city: "Patiala",
    establishedYear: 1956,
    collegeType: CollegeType.DEEMED,
    rating: 4.4,
    totalFees: 1650000,
    tier: 2,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/Thapar_University_Patiala.jpg/800px-Thapar_University_Patiala.jpg",
    imageAlt: "Thapar University Academic Block and Campus",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:Thapar_University_Patiala.jpg",
    websiteUrl: "https://www.thapar.edu",
  },
  { name: "PES University (RR Campus)", state: "Karnataka", city: "Bengaluru", establishedYear: 1988, collegeType: CollegeType.PRIVATE, rating: 4.3, totalFees: 1550000, tier: 2 },
  { name: "R.V. College of Engineering", state: "Karnataka", city: "Bengaluru", establishedYear: 1963, collegeType: CollegeType.PRIVATE, rating: 4.5, totalFees: 520000, tier: 1 },
  { name: "B.M.S. College of Engineering", state: "Karnataka", city: "Bengaluru", establishedYear: 1946, collegeType: CollegeType.PRIVATE, rating: 4.3, totalFees: 480000, tier: 2 },
  { name: "Ramaiah Institute of Technology", state: "Karnataka", city: "Bengaluru", establishedYear: 1962, collegeType: CollegeType.PRIVATE, rating: 4.3, totalFees: 490000, tier: 2 },
  { name: "PSG College of Technology", state: "Tamil Nadu", city: "Coimbatore", establishedYear: 1951, collegeType: CollegeType.PRIVATE, rating: 4.4, totalFees: 380000, tier: 2 },
  { name: "SRM Institute of Science and Technology", state: "Tamil Nadu", city: "Kattankulathur", establishedYear: 1985, collegeType: CollegeType.DEEMED, rating: 4.1, totalFees: 1200000, tier: 2 },
  { name: "Amrita Vishwa Vidyapeetham", state: "Tamil Nadu", city: "Coimbatore", establishedYear: 1994, collegeType: CollegeType.DEEMED, rating: 4.3, totalFees: 1100000, tier: 2 },
  { name: "SASTRA Deemed University", state: "Tamil Nadu", city: "Thanjavur", establishedYear: 1984, collegeType: CollegeType.DEEMED, rating: 4.2, totalFees: 580000, tier: 2 },
  { name: "Shiv Nadar University", state: "Uttar Pradesh", city: "Greater Noida", establishedYear: 2011, collegeType: CollegeType.PRIVATE, rating: 4.2, totalFees: 1450000, tier: 2 },
  { name: "Dhirubhai Ambani IICT", state: "Gujarat", city: "Gandhinagar", establishedYear: 2001, collegeType: CollegeType.DEEMED, rating: 4.5, totalFees: 950000, tier: 1 },
  { name: "Nirma University", state: "Gujarat", city: "Ahmedabad", establishedYear: 2003, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 860000, tier: 2 },
  { name: "Kalinga Institute of Industrial Technology", state: "Odisha", city: "Bhubaneswar", establishedYear: 1992, collegeType: CollegeType.DEEMED, rating: 4.2, totalFees: 1400000, tier: 2 },
  { name: "Siksha 'O' Anusandhan", state: "Odisha", city: "Bhubaneswar", establishedYear: 2007, collegeType: CollegeType.DEEMED, rating: 4.0, totalFees: 1050000, tier: 3 },
  { name: "Lovely Professional University", state: "Punjab", city: "Phagwara", establishedYear: 2005, collegeType: CollegeType.PRIVATE, rating: 3.9, totalFees: 980000, tier: 3 },
  { name: "Chitkara University", state: "Punjab", city: "Rajpura", establishedYear: 2010, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 820000, tier: 3 },
  { name: "UPES Dehradun", state: "Uttarakhand", city: "Dehradun", establishedYear: 2003, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 1520000, tier: 3 },
  { name: "Graphic Era University", state: "Uttarakhand", city: "Dehradun", establishedYear: 1993, collegeType: CollegeType.DEEMED, rating: 3.9, totalFees: 880000, tier: 3 },
  { name: "Amity University Noida", state: "Uttar Pradesh", city: "Noida", establishedYear: 2005, collegeType: CollegeType.PRIVATE, rating: 3.9, totalFees: 1350000, tier: 3 },
  { name: "Bennett University", state: "Uttar Pradesh", city: "Greater Noida", establishedYear: 2016, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 1480000, tier: 3 },
  { name: "The LNM Institute of Information Technology", state: "Rajasthan", city: "Jaipur", establishedYear: 2002, collegeType: CollegeType.DEEMED, rating: 4.3, totalFees: 1580000, tier: 2 },
  { name: "Heritage Institute of Technology", state: "West Bengal", city: "Kolkata", establishedYear: 2001, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 420000, tier: 3 },
  { name: "Institute of Engineering and Management", state: "West Bengal", city: "Kolkata", establishedYear: 1989, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 460000, tier: 2 },
  { name: "Techno Main Salt Lake", state: "West Bengal", city: "Kolkata", establishedYear: 2001, collegeType: CollegeType.PRIVATE, rating: 3.9, totalFees: 390000, tier: 3 },
  { name: "Dayananda Sagar College of Engineering", state: "Karnataka", city: "Bengaluru", establishedYear: 1979, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 460000, tier: 2 },
  { name: "Siddaganga Institute of Technology", state: "Karnataka", city: "Tumakuru", establishedYear: 1963, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 380000, tier: 3 },
  { name: "MIT World Peace University", state: "Maharashtra", city: "Pune", establishedYear: 1983, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 1320000, tier: 3 },
  { name: "Vishwakarma Institute of Technology", state: "Maharashtra", city: "Pune", establishedYear: 1983, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 680000, tier: 2 },
  { name: "Sardar Patel Institute of Technology", state: "Maharashtra", city: "Mumbai", establishedYear: 2005, collegeType: CollegeType.PRIVATE, rating: 4.3, totalFees: 690000, tier: 2 },
  { name: "K. J. Somaiya College of Engineering", state: "Maharashtra", city: "Mumbai", establishedYear: 1983, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 1400000, tier: 3 },
  { name: "Dwarkadas J. Sanghvi College of Engineering", state: "Maharashtra", city: "Mumbai", establishedYear: 1994, collegeType: CollegeType.PRIVATE, rating: 4.2, totalFees: 790000, tier: 2 },
  { name: "Chaitanya Bharathi Institute of Technology", state: "Telangana", city: "Hyderabad", establishedYear: 1979, collegeType: CollegeType.PRIVATE, rating: 4.2, totalFees: 580000, tier: 2 },
  { name: "VNR Vignana Jyothi Institute of Engineering", state: "Telangana", city: "Hyderabad", establishedYear: 1995, collegeType: CollegeType.PRIVATE, rating: 4.2, totalFees: 560000, tier: 2 },
  { name: "Vasavi College of Engineering", state: "Telangana", city: "Hyderabad", establishedYear: 1981, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 540000, tier: 2 },
  { name: "Gokaraju Rangaraju Institute of Engineering", state: "Telangana", city: "Hyderabad", establishedYear: 1997, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 520000, tier: 3 },
  { name: "KLE Technological University", state: "Karnataka", city: "Hubballi", establishedYear: 1947, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 420000, tier: 3 },
  { name: "National Institute of Engineering", state: "Karnataka", city: "Mysuru", establishedYear: 1946, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 430000, tier: 2 },
  { name: "BMS Institute of Technology and Management", state: "Karnataka", city: "Bengaluru", establishedYear: 2002, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 460000, tier: 3 },
  { name: "Sir M. Visvesvaraya Institute of Technology", state: "Karnataka", city: "Bengaluru", establishedYear: 1986, collegeType: CollegeType.PRIVATE, rating: 3.9, totalFees: 440000, tier: 3 },
  { name: "Jaypee Institute of Information Technology", state: "Uttar Pradesh", city: "Noida", establishedYear: 2001, collegeType: CollegeType.DEEMED, rating: 4.1, totalFees: 1150000, tier: 2 },
  { name: "Galgotias University", state: "Uttar Pradesh", city: "Greater Noida", establishedYear: 2011, collegeType: CollegeType.PRIVATE, rating: 3.8, totalFees: 680000, tier: 3 },
  { name: "GLA University", state: "Uttar Pradesh", city: "Mathura", establishedYear: 1998, collegeType: CollegeType.PRIVATE, rating: 3.9, totalFees: 640000, tier: 3 },
  { name: "Chandigarh University", state: "Punjab", city: "Mohali", establishedYear: 2012, collegeType: CollegeType.PRIVATE, rating: 3.9, totalFees: 780000, tier: 3 },
  { name: "Jain University", state: "Karnataka", city: "Bengaluru", establishedYear: 1990, collegeType: CollegeType.DEEMED, rating: 3.9, totalFees: 950000, tier: 3 },
  { name: "Kalasalingam Academy of Research and Education", state: "Tamil Nadu", city: "Srivilliputhur", establishedYear: 1984, collegeType: CollegeType.DEEMED, rating: 3.9, totalFees: 520000, tier: 3 },
  { name: "Hindustan Institute of Technology and Science", state: "Tamil Nadu", city: "Chennai", establishedYear: 1985, collegeType: CollegeType.DEEMED, rating: 3.9, totalFees: 920000, tier: 3 },
  { name: "Vel Tech Rangarajan Dr. Sagunthala R&D Institute", state: "Tamil Nadu", city: "Chennai", establishedYear: 1997, collegeType: CollegeType.DEEMED, rating: 3.8, totalFees: 740000, tier: 3 },
  { name: "Bannari Amman Institute of Technology", state: "Tamil Nadu", city: "Sathyamangalam", establishedYear: 1996, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 360000, tier: 3 },
  { name: "Kongu Engineering College", state: "Tamil Nadu", city: "Perundurai", establishedYear: 1984, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 350000, tier: 3 },
  { name: "Government Engineering College Thrissur", state: "Kerala", city: "Thrissur", establishedYear: 1957, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 80000, tier: 2 },
  { name: "College of Engineering Trivandrum", state: "Kerala", city: "Thiruvananthapuram", establishedYear: 1939, collegeType: CollegeType.GOVERNMENT, rating: 4.3, totalFees: 85000, tier: 2 },
  { name: "TKM College of Engineering", state: "Kerala", city: "Kollam", establishedYear: 1958, collegeType: CollegeType.GOVERNMENT, rating: 4.1, totalFees: 90000, tier: 3 },
  { name: "Kalyani Government Engineering College", state: "West Bengal", city: "Kalyani", establishedYear: 1995, collegeType: CollegeType.GOVERNMENT, rating: 4.1, totalFees: 75000, tier: 2 },
  { name: "Jalpaiguri Government Engineering College", state: "West Bengal", city: "Jalpaiguri", establishedYear: 1961, collegeType: CollegeType.GOVERNMENT, rating: 4.0, totalFees: 65000, tier: 3 },
  { name: "University Institute of Engineering and Technology PU", state: "Punjab", city: "Chandigarh", establishedYear: 2002, collegeType: CollegeType.GOVERNMENT, rating: 4.0, totalFees: 380000, tier: 2 },
  { name: "Guru Nanak Dev Engineering College", state: "Punjab", city: "Ludhiana", establishedYear: 1953, collegeType: CollegeType.PRIVATE, rating: 3.9, totalFees: 360000, tier: 3 },
  { name: "Shri Govindram Seksaria Institute of Technology", state: "Madhya Pradesh", city: "Indore", establishedYear: 1952, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 340000, tier: 2 },
  { name: "Madhav Institute of Technology and Science", state: "Madhya Pradesh", city: "Gwalior", establishedYear: 1957, collegeType: CollegeType.GOVERNMENT, rating: 3.9, totalFees: 290000, tier: 3 },
  { name: "Birla Institute of Technology Mesra", state: "Jharkhand", city: "Ranchi", establishedYear: 1955, collegeType: CollegeType.DEEMED, rating: 4.3, totalFees: 1380000, tier: 2 },
  { name: "National Institute of Science and Technology", state: "Odisha", city: "Berhampur", establishedYear: 1996, collegeType: CollegeType.PRIVATE, rating: 3.8, totalFees: 480000, tier: 3 },
  { name: "Siliguri Institute of Technology", state: "West Bengal", city: "Siliguri", establishedYear: 1999, collegeType: CollegeType.PRIVATE, rating: 3.7, totalFees: 360000, tier: 3 },
  { name: "Meghnad Saha Institute of Technology", state: "West Bengal", city: "Kolkata", establishedYear: 2001, collegeType: CollegeType.PRIVATE, rating: 3.8, totalFees: 370000, tier: 3 },
  { name: "Haldia Institute of Technology", state: "West Bengal", city: "Haldia", establishedYear: 1996, collegeType: CollegeType.PRIVATE, rating: 3.9, totalFees: 380000, tier: 3 },
  { name: "Netaji Subhash Engineering College", state: "West Bengal", city: "Kolkata", establishedYear: 1998, collegeType: CollegeType.PRIVATE, rating: 3.8, totalFees: 380000, tier: 3 },
  { name: "Narula Institute of Technology", state: "West Bengal", city: "Agarpara", establishedYear: 2001, collegeType: CollegeType.PRIVATE, rating: 3.8, totalFees: 390000, tier: 3 },
  { name: "Guru Gobind Singh Indraprastha University", state: "Delhi", city: "New Delhi", establishedYear: 1998, collegeType: CollegeType.GOVERNMENT, rating: 4.1, totalFees: 320000, tier: 2 },
  { name: "Maharaja Agrasen Institute of Technology", state: "Delhi", city: "New Delhi", establishedYear: 1999, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 480000, tier: 2 },
  { name: "Bharati Vidyapeeth College of Engineering", state: "Delhi", city: "New Delhi", establishedYear: 1999, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 490000, tier: 3 },
  { name: "Bhagwan Parshuram Institute of Technology", state: "Delhi", city: "New Delhi", establishedYear: 2007, collegeType: CollegeType.PRIVATE, rating: 3.8, totalFees: 470000, tier: 3 },
  { name: "Walchand College of Engineering", state: "Maharashtra", city: "Sangli", establishedYear: 1947, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 320000, tier: 2 },
  { name: "Government College of Engineering Amravati", state: "Maharashtra", city: "Amravati", establishedYear: 1964, collegeType: CollegeType.GOVERNMENT, rating: 4.0, totalFees: 120000, tier: 3 },
  { name: "Government College of Engineering Aurangabad", state: "Maharashtra", city: "Chhatrapati Sambhajinagar", establishedYear: 1960, collegeType: CollegeType.GOVERNMENT, rating: 4.0, totalFees: 115000, tier: 3 },

  // --- PREMIER MEDICAL INSTITUTIONS (NEET) ---
  {
    name: "All India Institute of Medical Sciences New Delhi",
    state: "Delhi",
    city: "New Delhi",
    establishedYear: 1956,
    collegeType: CollegeType.GOVERNMENT,
    rating: 4.9,
    totalFees: 7000,
    isMedical: true,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/AIIMS_New_Delhi_Main_Building.jpg/800px-AIIMS_New_Delhi_Main_Building.jpg",
    imageAlt: "AIIMS New Delhi Academic and Hospital Complex",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:AIIMS_New_Delhi_Main_Building.jpg",
    websiteUrl: "https://www.aiims.edu",
  },
  {
    name: "Christian Medical College Vellore",
    state: "Tamil Nadu",
    city: "Vellore",
    establishedYear: 1900,
    collegeType: CollegeType.PRIVATE,
    rating: 4.8,
    totalFees: 240000,
    isMedical: true,
    tier: 1,
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/CMC_Vellore_Hospital_Entrance.jpg/800px-CMC_Vellore_Hospital_Entrance.jpg",
    imageAlt: "CMC Vellore Campus and Hospital",
    imageSourceUrl: "https://commons.wikimedia.org/wiki/File:CMC_Vellore_Hospital_Entrance.jpg",
    websiteUrl: "https://www.cmch-vellore.edu",
  },
  { name: "Jawaharlal Institute of Postgraduate Medical Education & Research", state: "Puducherry", city: "Puducherry", establishedYear: 1823, collegeType: CollegeType.GOVERNMENT, rating: 4.8, totalFees: 18000, isMedical: true, tier: 1 },
  { name: "King George's Medical University", state: "Uttar Pradesh", city: "Lucknow", establishedYear: 1905, collegeType: CollegeType.GOVERNMENT, rating: 4.6, totalFees: 240000, isMedical: true, tier: 1 },
  { name: "Kasturba Medical College Manipal", state: "Karnataka", city: "Manipal", establishedYear: 1953, collegeType: CollegeType.DEEMED, rating: 4.6, totalFees: 7200000, isMedical: true, tier: 1 },
  { name: "Bangalore Medical College and Research Institute", state: "Karnataka", city: "Bengaluru", establishedYear: 1955, collegeType: CollegeType.GOVERNMENT, rating: 4.5, totalFees: 320000, isMedical: true, tier: 1 },
  { name: "Madras Medical College", state: "Tamil Nadu", city: "Chennai", establishedYear: 1835, collegeType: CollegeType.GOVERNMENT, rating: 4.6, totalFees: 110000, isMedical: true, tier: 1 },
  { name: "Grant Government Medical College and Sir J.J. Group", state: "Maharashtra", city: "Mumbai", establishedYear: 1845, collegeType: CollegeType.GOVERNMENT, rating: 4.5, totalFees: 520000, isMedical: true, tier: 1 },
  { name: "Seth G.S. Medical College and KEM Hospital", state: "Maharashtra", city: "Mumbai", establishedYear: 1926, collegeType: CollegeType.GOVERNMENT, rating: 4.6, totalFees: 480000, isMedical: true, tier: 1 },
  { name: "Medical College Kolkata", state: "West Bengal", city: "Kolkata", establishedYear: 1835, collegeType: CollegeType.GOVERNMENT, rating: 4.6, totalFees: 54000, isMedical: true, tier: 1 },
  { name: "Institute of Post-Graduate Medical Education and Research", state: "West Bengal", city: "Kolkata", establishedYear: 1957, collegeType: CollegeType.GOVERNMENT, rating: 4.5, totalFees: 48000, isMedical: true, tier: 1 },
  { name: "AIIMS Bhubaneswar", state: "Odisha", city: "Bhubaneswar", establishedYear: 2012, collegeType: CollegeType.GOVERNMENT, rating: 4.7, totalFees: 8000, isMedical: true, tier: 1 },
  { name: "AIIMS Jodhpur", state: "Rajasthan", city: "Jodhpur", establishedYear: 2012, collegeType: CollegeType.GOVERNMENT, rating: 4.7, totalFees: 8000, isMedical: true, tier: 1 },
  { name: "AIIMS Rishikesh", state: "Uttarakhand", city: "Rishikesh", establishedYear: 2012, collegeType: CollegeType.GOVERNMENT, rating: 4.6, totalFees: 8000, isMedical: true, tier: 1 },
  { name: "AIIMS Bhopal", state: "Madhya Pradesh", city: "Bhopal", establishedYear: 2012, collegeType: CollegeType.GOVERNMENT, rating: 4.6, totalFees: 8000, isMedical: true, tier: 1 },
  { name: "St. John's Medical College", state: "Karnataka", city: "Bengaluru", establishedYear: 1963, collegeType: CollegeType.PRIVATE, rating: 4.6, totalFees: 3200000, isMedical: true, tier: 1 },
  { name: "Vardhman Mahavir Medical College and Safdarjung Hospital", state: "Delhi", city: "New Delhi", establishedYear: 2001, collegeType: CollegeType.GOVERNMENT, rating: 4.7, totalFees: 180000, isMedical: true, tier: 1 },
  { name: "Maulana Azad Medical College", state: "Delhi", city: "New Delhi", establishedYear: 1958, collegeType: CollegeType.GOVERNMENT, rating: 4.8, totalFees: 25000, isMedical: true, tier: 1 },
  { name: "Lady Hardinge Medical College", state: "Delhi", city: "New Delhi", establishedYear: 1916, collegeType: CollegeType.GOVERNMENT, rating: 4.5, totalFees: 20000, isMedical: true, tier: 1 },
  { name: "Armed Forces Medical College", state: "Maharashtra", city: "Pune", establishedYear: 1948, collegeType: CollegeType.GOVERNMENT, rating: 4.8, totalFees: 45000, isMedical: true, tier: 1 },
  { name: "Government Medical College and Hospital Chandigarh", state: "Punjab", city: "Chandigarh", establishedYear: 1991, collegeType: CollegeType.GOVERNMENT, rating: 4.5, totalFees: 120000, isMedical: true, tier: 1 },
  { name: "B. J. Medical College", state: "Gujarat", city: "Ahmedabad", establishedYear: 1871, collegeType: CollegeType.GOVERNMENT, rating: 4.4, totalFees: 150000, isMedical: true, tier: 2 },
  { name: "Gauhati Medical College and Hospital", state: "Assam", city: "Guwahati", establishedYear: 1960, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 60000, isMedical: true, tier: 2 },
  { name: "Patna Medical College and Hospital", state: "Bihar", city: "Patna", establishedYear: 1925, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 75000, isMedical: true, tier: 2 },
  { name: "Osmania Medical College", state: "Telangana", city: "Hyderabad", establishedYear: 1846, collegeType: CollegeType.GOVERNMENT, rating: 4.5, totalFees: 90000, isMedical: true, tier: 1 },
  { name: "Gandhi Medical College", state: "Telangana", city: "Secunderabad", establishedYear: 1954, collegeType: CollegeType.GOVERNMENT, rating: 4.4, totalFees: 85000, isMedical: true, tier: 2 },
  { name: "Kozhikode Government Medical College", state: "Kerala", city: "Kozhikode", establishedYear: 1957, collegeType: CollegeType.GOVERNMENT, rating: 4.5, totalFees: 95000, isMedical: true, tier: 1 },
  { name: "Government Medical College Thiruvananthapuram", state: "Kerala", city: "Thiruvananthapuram", establishedYear: 1951, collegeType: CollegeType.GOVERNMENT, rating: 4.5, totalFees: 90000, isMedical: true, tier: 1 },
  { name: "SCB Medical College", state: "Odisha", city: "Cuttack", establishedYear: 1944, collegeType: CollegeType.GOVERNMENT, rating: 4.4, totalFees: 80000, isMedical: true, tier: 2 },
  { name: "Sawai Man Singh Medical College", state: "Rajasthan", city: "Jaipur", establishedYear: 1947, collegeType: CollegeType.GOVERNMENT, rating: 4.5, totalFees: 110000, isMedical: true, tier: 1 },

  // --- ADDITIONAL PROMINENT ENGINEERING & STATE UNIVERSITIES ---
  { name: "MKSSS Cummins College of Engineering for Women", state: "Maharashtra", city: "Pune", establishedYear: 1991, collegeType: CollegeType.PRIVATE, rating: 4.2, totalFees: 680000, tier: 2 },
  { name: "Vishwakarma Institute of Information Technology", state: "Maharashtra", city: "Pune", establishedYear: 2002, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 640000, tier: 2 },
  { name: "Government College of Engineering Karad", state: "Maharashtra", city: "Karad", establishedYear: 1960, collegeType: CollegeType.GOVERNMENT, rating: 4.0, totalFees: 130000, tier: 3 },
  { name: "Fr. Conceicao Rodrigues College of Engineering", state: "Maharashtra", city: "Mumbai", establishedYear: 1984, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 680000, tier: 2 },
  { name: "University Visvesvaraya College of Engineering", state: "Karnataka", city: "Bengaluru", establishedYear: 1917, collegeType: CollegeType.GOVERNMENT, rating: 4.3, totalFees: 140000, tier: 2 },
  { name: "JSS Science and Technology University", state: "Karnataka", city: "Mysuru", establishedYear: 1963, collegeType: CollegeType.PRIVATE, rating: 4.2, totalFees: 480000, tier: 2 },
  { name: "SDM College of Engineering and Technology", state: "Karnataka", city: "Dharwad", establishedYear: 1979, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 380000, tier: 3 },
  { name: "NMAM Institute of Technology", state: "Karnataka", city: "Nitte", establishedYear: 1986, collegeType: CollegeType.DEEMED, rating: 4.0, totalFees: 460000, tier: 3 },
  { name: "Bangalore Institute of Technology", state: "Karnataka", city: "Bengaluru", establishedYear: 1979, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 460000, tier: 3 },
  { name: "Thiagarajar College of Engineering", state: "Tamil Nadu", city: "Madurai", establishedYear: 1957, collegeType: CollegeType.GOVERNMENT, rating: 4.3, totalFees: 240000, tier: 2 },
  { name: "Government College of Technology Coimbatore", state: "Tamil Nadu", city: "Coimbatore", establishedYear: 1945, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 180000, tier: 2 },
  { name: "Sri Sivasubramaniya Nadar College of Engineering", state: "Tamil Nadu", city: "Chennai", establishedYear: 1996, collegeType: CollegeType.PRIVATE, rating: 4.4, totalFees: 420000, tier: 2 },
  { name: "Kumaraguru College of Technology", state: "Tamil Nadu", city: "Coimbatore", establishedYear: 1984, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 380000, tier: 3 },
  { name: "Coimbatore Institute of Technology", state: "Tamil Nadu", city: "Coimbatore", establishedYear: 1956, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 220000, tier: 2 },
  { name: "Madras Institute of Technology", state: "Tamil Nadu", city: "Chennai", establishedYear: 1949, collegeType: CollegeType.GOVERNMENT, rating: 4.4, totalFees: 210000, tier: 2 },
  { name: "JNTU College of Engineering Hyderabad", state: "Telangana", city: "Hyderabad", establishedYear: 1965, collegeType: CollegeType.GOVERNMENT, rating: 4.3, totalFees: 220000, tier: 2 },
  { name: "Vardhaman College of Engineering", state: "Telangana", city: "Hyderabad", establishedYear: 1999, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 520000, tier: 3 },
  { name: "CVR College of Engineering", state: "Telangana", city: "Hyderabad", establishedYear: 2001, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 480000, tier: 3 },
  { name: "Keshav Memorial Institute of Technology", state: "Telangana", city: "Hyderabad", establishedYear: 2007, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 490000, tier: 3 },
  { name: "Gayatri Vidya Parishad College of Engineering", state: "Andhra Pradesh", city: "Visakhapatnam", establishedYear: 1996, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 380000, tier: 3 },
  { name: "VR Siddhartha Engineering College", state: "Andhra Pradesh", city: "Vijayawada", establishedYear: 1977, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 370000, tier: 3 },
  { name: "GMR Institute of Technology", state: "Andhra Pradesh", city: "Rajam", establishedYear: 1997, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 360000, tier: 3 },
  { name: "Indira Gandhi Delhi Technical University for Women", state: "Delhi", city: "New Delhi", establishedYear: 1998, collegeType: CollegeType.GOVERNMENT, rating: 4.4, totalFees: 440000, tier: 1 },
  { name: "Faculty of Engineering Jamia Millia Islamia", state: "Delhi", city: "New Delhi", establishedYear: 1920, collegeType: CollegeType.GOVERNMENT, rating: 4.3, totalFees: 180000, tier: 2 },
  { name: "Institute of Engineering and Technology Lucknow", state: "Uttar Pradesh", city: "Lucknow", establishedYear: 1984, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 340000, tier: 2 },
  { name: "Madan Mohan Malaviya University of Technology", state: "Uttar Pradesh", city: "Gorakhpur", establishedYear: 1962, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 360000, tier: 2 },
  { name: "Ajay Kumar Garg Engineering College", state: "Uttar Pradesh", city: "Ghaziabad", establishedYear: 1998, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 480000, tier: 3 },
  { name: "KIET Group of Institutions", state: "Uttar Pradesh", city: "Ghaziabad", establishedYear: 1998, collegeType: CollegeType.PRIVATE, rating: 4.0, totalFees: 470000, tier: 3 },
  { name: "JSS Academy of Technical Education Noida", state: "Uttar Pradesh", city: "Noida", establishedYear: 1998, collegeType: CollegeType.PRIVATE, rating: 3.9, totalFees: 490000, tier: 3 },
  { name: "Government College of Engineering and Leather Technology", state: "West Bengal", city: "Kolkata", establishedYear: 1919, collegeType: CollegeType.GOVERNMENT, rating: 4.0, totalFees: 68000, tier: 3 },
  { name: "Government College of Engineering and Ceramic Technology", state: "West Bengal", city: "Kolkata", establishedYear: 1941, collegeType: CollegeType.GOVERNMENT, rating: 3.9, totalFees: 65000, tier: 3 },
  { name: "RCC Institute of Information Technology", state: "West Bengal", city: "Kolkata", establishedYear: 1999, collegeType: CollegeType.GOVERNMENT, rating: 3.9, totalFees: 240000, tier: 3 },
  { name: "Institute of Radio Physics and Electronics Calcutta University", state: "West Bengal", city: "Kolkata", establishedYear: 1949, collegeType: CollegeType.GOVERNMENT, rating: 4.4, totalFees: 36000, tier: 2 },
  { name: "Future Institute of Engineering and Management", state: "West Bengal", city: "Kolkata", establishedYear: 2002, collegeType: CollegeType.PRIVATE, rating: 3.8, totalFees: 380000, tier: 3 },
  { name: "MBM University Jodhpur", state: "Rajasthan", city: "Jodhpur", establishedYear: 1951, collegeType: CollegeType.GOVERNMENT, rating: 4.1, totalFees: 240000, tier: 2 },
  { name: "College of Technology and Engineering Udaipur", state: "Rajasthan", city: "Udaipur", establishedYear: 1964, collegeType: CollegeType.GOVERNMENT, rating: 4.0, totalFees: 220000, tier: 3 },
  { name: "Birla Vishvakarma Mahavidyalaya", state: "Gujarat", city: "Anand", establishedYear: 1948, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 180000, tier: 2 },
  { name: "Dharmsinh Desai University", state: "Gujarat", city: "Nadiad", establishedYear: 1968, collegeType: CollegeType.DEEMED, rating: 4.1, totalFees: 480000, tier: 2 },
  { name: "Pandit Deendayal Energy University", state: "Gujarat", city: "Gandhinagar", establishedYear: 2007, collegeType: CollegeType.PRIVATE, rating: 4.2, totalFees: 1050000, tier: 2 },
  { name: "Model Engineering College Kochi", state: "Kerala", city: "Kochi", establishedYear: 1989, collegeType: CollegeType.GOVERNMENT, rating: 4.2, totalFees: 95000, tier: 2 },
  { name: "Rajagiri School of Engineering & Technology", state: "Kerala", city: "Kochi", establishedYear: 2001, collegeType: CollegeType.PRIVATE, rating: 4.1, totalFees: 360000, tier: 3 },
  { name: "Mar Athanasius College of Engineering", state: "Kerala", city: "Kothamangalam", establishedYear: 1961, collegeType: CollegeType.GOVERNMENT, rating: 4.1, totalFees: 90000, tier: 3 },
  { name: "Assam Engineering College", state: "Assam", city: "Guwahati", establishedYear: 1955, collegeType: CollegeType.GOVERNMENT, rating: 4.0, totalFees: 60000, tier: 3 },
  { name: "Jorhat Engineering College", state: "Assam", city: "Jorhat", establishedYear: 1959, collegeType: CollegeType.GOVERNMENT, rating: 4.0, totalFees: 58000, tier: 3 },
];

async function main() {
  console.log(`Starting database seed with ${COLLEGES_DATA.length} colleges...`);

  // Clear existing data cleanly in foreign key dependency order
  console.log("Resetting existing records...");
  await prisma.admissionCutoff.deleteMany();
  await prisma.review.deleteMany();
  await prisma.placementStats.deleteMany();
  await prisma.course.deleteMany();
  await prisma.college.deleteMany();
  await prisma.exam.deleteMany();

  // Create Exams
  console.log("Registering national entrance exams...");
  const jeeMain = await prisma.exam.create({
    data: {
      name: "JEE Main",
      code: "JEE_MAIN",
      description: "Joint Entrance Examination (Main) for NITs, IIITs, DTU, NSUT, and CFTIs across India",
    },
  });

  const jeeAdvanced = await prisma.exam.create({
    data: {
      name: "JEE Advanced",
      code: "JEE_ADVANCED",
      description: "Joint Entrance Examination (Advanced) exclusively for Indian Institutes of Technology (IITs)",
    },
  });

  const bitsat = await prisma.exam.create({
    data: {
      name: "BITSAT",
      code: "BITSAT",
      description: "Birla Institute of Technology and Science Admission Test for BITS campuses",
    },
  });

  const neet = await prisma.exam.create({
    data: {
      name: "NEET",
      code: "NEET",
      description: "National Eligibility cum Entrance Test for Undergraduate Medical Programs (MBBS/BDS)",
    },
  });

  console.log("Created 4 entrance exams: JEE_MAIN, JEE_ADVANCED, BITSAT, NEET");

  const categories: Category[] = ["GENERAL", "OBC", "SC", "ST", "EWS"];
  const currentYear = new Date().getFullYear();

  const engineeringRecruitersTier1 = [
    "Google", "Microsoft", "Amazon", "Apple", "NVIDIA", "Goldman Sachs",
    "Qualcomm", "Oracle", "Uber", "Tower Research", "Texas Instruments", "Atlassian"
  ];
  const engineeringRecruitersTier2 = [
    "Samsung", "Intel", "Cisco", "Adobe", "Morgan Stanley", "Flipkart",
    "Deloitte", "Tata Consultancy Services", "Infosys", "Wipro", "Accenture", "L&T"
  ];
  const medicalRecruiters = [
    "Apollo Hospitals", "Fortis Healthcare", "Max Healthcare", "Manipal Hospitals",
    "Medanta The Medicity", "Narayana Health", "AIIMS Residency", "NHS UK"
  ];

  let totalCollegesCreated = 0;
  let totalCoursesCreated = 0;
  let totalCutoffsCreated = 0;

  console.log(`Seeding ${COLLEGES_DATA.length} colleges with nested courses, placement records, reviews, and cutoffs...`);

  for (const cData of COLLEGES_DATA) {
    const isIIT = cData.name.startsWith("Indian Institute of Technology") && !cData.name.includes("BHU");
    const isBITS = cData.name.startsWith("BITS Pilani");
    const isMedical = !!cData.isMedical;

    // Courses for this college
    const coursesToCreate = [];
    if (isMedical) {
      coursesToCreate.push(
        { name: "MBBS (Bachelor of Medicine & Bachelor of Surgery)", duration: 5, fees: cData.totalFees, seats: 150, eligibility: "10+2 with Physics, Chemistry, Biology and NEET-UG Qualification" },
        { name: "MD General Medicine", duration: 3, fees: Math.floor(cData.totalFees * 1.2), seats: 30, eligibility: "MBBS Degree and NEET-PG Qualification" },
        { name: "MS General Surgery", duration: 3, fees: Math.floor(cData.totalFees * 1.15), seats: 25, eligibility: "MBBS Degree and NEET-PG Qualification" }
      );
    } else {
      coursesToCreate.push(
        { name: "B.Tech Computer Science and Engineering", duration: 4, fees: Math.floor(cData.totalFees * 1.05), seats: 180, eligibility: "10+2 with Physics, Chemistry, Mathematics (PCM)" },
        { name: "B.Tech Electronics and Communication Engineering", duration: 4, fees: Math.floor(cData.totalFees * 0.98), seats: 140, eligibility: "10+2 with Physics, Chemistry, Mathematics (PCM)" },
        { name: "B.Tech Electrical Engineering", duration: 4, fees: Math.floor(cData.totalFees * 0.95), seats: 120, eligibility: "10+2 with Physics, Chemistry, Mathematics (PCM)" },
        { name: "B.Tech Mechanical Engineering", duration: 4, fees: Math.floor(cData.totalFees * 0.92), seats: 120, eligibility: "10+2 with Physics, Chemistry, Mathematics (PCM)" }
      );

      if (cData.tier <= 2) {
        coursesToCreate.push(
          { name: "B.Tech Artificial Intelligence and Data Science", duration: 4, fees: Math.floor(cData.totalFees * 1.08), seats: 60, eligibility: "10+2 with Physics, Chemistry, Mathematics (PCM)" }
        );
      }
    }

    // 3 Years Placement Stats
    const placementStatsToCreate = [];
    for (let yrIndex = 0; yrIndex < 3; yrIndex++) {
      const year = currentYear - yrIndex;
      let highestPackage: number;
      let averagePackage: number;
      let medianPackage: number;
      let placementRate: number;
      let topRecruiters: string[];

      if (isMedical) {
        averagePackage = 1200000 + (cData.tier === 1 ? 500000 : 200000) - (yrIndex * 40000);
        highestPackage = averagePackage * 2.2;
        medianPackage = Math.round(averagePackage * 0.92);
        placementRate = 96 - (yrIndex * 1.5) + (Math.random() * 2);
        topRecruiters = medicalRecruiters.slice(0, 6);
      } else if (cData.tier === 1) {
        averagePackage = 2100000 + Math.floor(Math.random() * 400000) - (yrIndex * 90000);
        highestPackage = 5500000 + Math.floor(Math.random() * 8000000);
        medianPackage = Math.round(averagePackage * 0.88);
        placementRate = 91 + Math.random() * 7;
        topRecruiters = engineeringRecruitersTier1.slice(0, 6);
      } else if (cData.tier === 2) {
        averagePackage = 1100000 + Math.floor(Math.random() * 300000) - (yrIndex * 50000);
        highestPackage = 3200000 + Math.floor(Math.random() * 2000000);
        medianPackage = Math.round(averagePackage * 0.85);
        placementRate = 84 + Math.random() * 10;
        topRecruiters = engineeringRecruitersTier2.slice(0, 6);
      } else {
        averagePackage = 580000 + Math.floor(Math.random() * 200000) - (yrIndex * 30000);
        highestPackage = 1800000 + Math.floor(Math.random() * 1000000);
        medianPackage = Math.round(averagePackage * 0.82);
        placementRate = 72 + Math.random() * 14;
        topRecruiters = engineeringRecruitersTier2.slice(4, 10);
      }

      placementStatsToCreate.push({
        year,
        averagePackage: Math.round(averagePackage),
        highestPackage: Math.round(highestPackage),
        medianPackage: Math.round(medianPackage),
        placementRate: Math.min(99.5, Number(placementRate.toFixed(1))),
        topRecruiters,
      });
    }

    // Varied Realistic Reviews
    const reviewArchetypes = [
      {
        rating: Math.min(5, Math.max(3, Math.round(cData.rating))),
        title: `Academics, faculty exposure, and campus culture at ${cData.city}`,
        content: `Academically rigorous curriculum with substantial industry relevance. Laboratory infrastructure is well-maintained and faculty members encourage research and technical student projects. Peer learning remains one of the strongest assets here.`,
        author: `Aditya Nair`,
        courseStudied: isMedical ? "MBBS" : "B.Tech CSE",
        graduationYear: currentYear - 1,
      },
      {
        rating: Math.min(5, Math.max(3, Math.round(cData.rating - 0.3))),
        title: "Placement support, internships, and recruiter network",
        content: `The training and placement cell coordinates diligently with recruiting organizations. Core companies and software firms visit regularly. Hostels and library facilities are functional, though administrative processes could be modernized.`,
        author: `Shreya Mukherjee`,
        courseStudied: isMedical ? "MBBS" : "B.Tech ECE",
        graduationYear: currentYear - 2,
      },
      {
        rating: Math.min(5, Math.max(3, Math.round(cData.rating + 0.1))),
        title: "Student life, clubs, and extracurricular balance",
        content: `Active student societies spanning technical fests, cultural events, and sports tournaments. Campus environment provides ample opportunities for holistic personal development alongside demanding academic semesters.`,
        author: `Vikram Singhania`,
        courseStudied: isMedical ? "MD General Medicine" : "B.Tech Mechanical",
        graduationYear: currentYear,
      },
    ];

    // Atomically create college with its courses, placement stats, and reviews
    const college = await prisma.college.create({
      data: {
        name: cData.name,
        state: cData.state,
        city: cData.city,
        location: `${cData.city}, ${cData.state}`,
        establishedYear: cData.establishedYear,
        collegeType: cData.collegeType,
        rating: cData.rating,
        totalFees: cData.totalFees,
        imageUrl: cData.imageUrl || null,
        imageAlt: cData.imageAlt || null,
        imageSourceUrl: cData.imageSourceUrl || null,
        websiteUrl: cData.websiteUrl || null,
        courses: {
          create: coursesToCreate,
        },
        placementStats: {
          create: placementStatsToCreate,
        },
        reviews: {
          create: reviewArchetypes,
        },
      },
      include: {
        courses: true,
      },
    });

    totalCollegesCreated++;
    totalCoursesCreated += college.courses.length;

    // Determine exam and historical cutoff ranks
    let targetExam = jeeMain;
    if (isMedical) {
      targetExam = neet;
    } else if (isIIT) {
      targetExam = jeeAdvanced;
    } else if (isBITS) {
      targetExam = bitsat;
    }

    // Base rank windows according to college tier & exam
    let baseOpen = 10000;
    let baseClose = 30000;

    if (isMedical) {
      if (cData.tier === 1) {
        baseOpen = 50;
        baseClose = cData.name.includes("New Delhi") ? 200 : 2500;
      } else {
        baseOpen = 2500;
        baseClose = 22000;
      }
    } else if (isIIT) {
      if (cData.rating >= 4.8) {
        baseOpen = 60;
        baseClose = 1200;
      } else if (cData.rating >= 4.5) {
        baseOpen = 800;
        baseClose = 4500;
      } else {
        baseOpen = 3000;
        baseClose = 8500;
      }
    } else if (isBITS) {
      baseOpen = 350;
      baseClose = 3800;
    } else {
      // JEE Main (NITs, IIITs, premier state, private)
      if (cData.tier === 1) {
        baseOpen = 800;
        baseClose = 9500;
      } else if (cData.tier === 2) {
        baseOpen = 8500;
        baseClose = 38000;
      } else {
        baseOpen = 35000;
        baseClose = 88000;
      }
    }

    // Seed cutoffs for primary course (CSE or MBBS) and secondary course
    const cutoffsToCreate = [];
    const primaryCourse = college.courses[0];
    const secondaryCourse = college.courses[1] || college.courses[0];

    const branchMultipliers = [
      { course: primaryCourse, branchFactor: 1.0 },
      { course: secondaryCourse, branchFactor: 1.35 },
    ];

    for (const bm of branchMultipliers) {
      if (!bm.course) continue;
      for (const category of categories) {
        let catMult = 1.0;
        if (category === "OBC") catMult = 1.25;
        if (category === "SC") catMult = 1.75;
        if (category === "ST") catMult = 2.15;
        if (category === "EWS") catMult = 1.12;

        const openingRank = Math.max(1, Math.round(baseOpen * bm.branchFactor * catMult));
        const closingRank = Math.max(openingRank + 150, Math.round(baseClose * bm.branchFactor * catMult));

        cutoffsToCreate.push({
          id: randomUUID(),
          collegeId: college.id,
          courseId: bm.course.id,
          examId: targetExam.id,
          year: currentYear - 1,
          openingRank,
          closingRank,
          category,
        });
        totalCutoffsCreated++;
      }
    }

    if (cutoffsToCreate.length > 0) {
      await prisma.admissionCutoff.createMany({
        data: cutoffsToCreate,
      });
    }

    if (totalCollegesCreated % 10 === 0 || totalCollegesCreated === 1 || totalCollegesCreated === COLLEGES_DATA.length) {
      console.log(` → [${totalCollegesCreated}/${COLLEGES_DATA.length}] ${college.name} (${college.city}, ${college.state})`);
    }
  }

  console.log("\n========================================");
  console.log("  Database Seed Completed Successfully!");
  console.log("========================================");
  console.log(`Colleges created:         ${totalCollegesCreated}`);
  console.log(`Courses created:          ${totalCoursesCreated}`);
  console.log(`Admission cutoffs created:${totalCutoffsCreated}`);
  console.log(`Reviews created:          ${totalCollegesCreated * 3}`);
  console.log(`Placement stats created:  ${totalCollegesCreated * 3}`);
}

main()
  .catch((err) => {
    console.error("Seed failed with error:", err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
