import { HomeIcon, NotebookIcon } from "lucide-react";

export const DATA = {
    name: "Deepanshu Moorjani",
    initials: "DM",
    url: "https://portfolio-deepanshu.vercel.app", // Placeholder
    location: "Jaipur, India",
    locationLink: "https://www.google.com/maps/place/Jaipur",
    description:
        "Full-stack developer specializing in scalable web systems, DevOps automation, and AI-driven features. I build secure, performant, and production-ready applications with clean architecture and great UX.",
    summary:
        "I am a full-stack developer with experience in web engineering, DevOps, and AI integration. I focus on building scalable, secure applications with clean architecture, reliable infrastructure, and thoughtful user experiences.",
    avatarUrl: "/profilepic.png",
    skills: [
        "React",
        "Next.js",
        "Typescript",
        "Node.js",
        "PostgreSQL",
        "MongoDB",
        "Docker",
        "Kubernetes",
        "Go",
        "C#",
        ".NET",
        "AWS",
        "TailwindCSS",
        "Jenkins",
        "Git",
        "Github",
        "Github Actions",
        "EC2"

    ],
    navbar: [
        { href: "/", icon: HomeIcon, label: "Home" },
    ],
    contact: {
        email: "deepanshu.moorjani20@gmail.com",
        tel: "+91 6350124004",
        social: {
            GitHub: {
                name: "GitHub",
                url: "https://github.com/deepanshu202002/",
                icon: "github",
                navbar: true,
            },
            LinkedIn: {
                name: "LinkedIn",
                url: "https://www.linkedin.com/in/deepanshu-moorjani/",
                icon: "linkedin",
                navbar: true,
            },
            email: {
                name: "Send Email",
                url: "mailto:deepanshu.moorjani20@gmail.com",
                icon: "email",
                navbar: false,
            },
        },
    },
    work: [
        {
            company: "Psy-care.in",
            href: "https://psy-care.in",
            badges: [],
            location: "Remote",
            title: "Full Stack Developer Intern",
            logoUrl: "",
            start: "Oct 2025",
            end: "Present",
            description: [
                "Built user-facing features and backend logic for a full-stack web product.",
                "Owned end-to-end feature flows, including UI, API design, data handling, and third-party integrations.",
                "Implemented WhatsApp-based communication using WATI for automated updates and notifications.",
                "Worked closely with product requirements to deliver reliable and user-friendly features.",
            ],
        },
        {
            company: "SaaSkart",
            href: "",
            badges: [],
            location: "Jaipur, Rajasthan",
            title: "Full Stack Developer Intern",
            logoUrl: "",
            start: "Aug 2024",
            end: "Oct 2024",
            description: [
                "Developed key features using Remix.js, React, TypeScript, and Node.js.",
                "Integrated AWS cloud services and PostgreSQL.",
                "Optimized UI/UX using TailwindCSS, Framer, and ShadCN.",
                "Spearheaded the migration of legacy components to modern React patterns, resulting in a 30% improvement in load times.",
                "Collaborated with cross-functional teams to define project requirements and deliverables.",
            ],
        },
    ],
    education: [
        {
            school: "Jaipur Engineering College and Research Center",
            href: "",
            degree: "Bachelor of Technology in Information Technology",
            logoUrl: "",
            start: "2020",
            end: "2024",
            grade: "CGPA: 7.8/10",
        },
    ],
    projects: [
        {
            title: "RevuHub",
            href: "https://github.com/deepanshu202002/revuhub-nextjs-k8s", // Inferred from Github profile link context
            dates: "Oct 2025",
            active: true,
            description:
                "AI-Powered Product Review Platform. Engineered a fine-tuned DistilBert toxicity classifier with a FastApi-based AI interface. Developed frontend/API using Next.js with Google OAuth. Containerized with Docker and deployed on Kubernetes.",
            technologies: [
                "Next.js",
                "Python",
                "FastAPI",
                "Docker",
                "Kubernetes",
                "Github Actions",
            ],
            links: [
                {
                    type: "Website",
                    href: "https://revuhub.vercel.app", // Hypothetical link or just Github
                    icon: "globe",
                },
                {
                    type: "Source",
                    href: "https://github.com/deepanshu202002/", // Adding generic if specific not known
                    icon: "github",
                },
            ],
            image: "",
            video: "",
        },
        {
            title: "Coffee Shop App",
            href: "",
            dates: "April 2024",
            active: true,
            description:
                "Innovative coffee shop app using React Native and Zustand. Implemented advanced search and optimized checkout process.",
            technologies: [
                "React Native",
                "Zustand",
                "TailwindCSS"
            ],
            links: [{
                type: "Source",
                href: "https://github.com/deepanshu202002/Coffee_Shop_App",
                icon: "github",
            }],
            image: "",
            video: "",
        },

        {
            title: "Doctor Appointment App",
            href: "",
            dates: "Nov 2023",
            active: true,
            description:
                "MERN Stack application for doctor appointments. Automated admin approval system and facilitated seamless appointment booking.",
            technologies: [
                "React",
                "Node.js",
                "MongoDB",
                "Express",
            ],
            links: [{
                type: "Source",
                href: "https://github.com/deepanshu202002/Doctor_Appointment",
                icon: "github",
            }],
            image: "",
            video: "",
        },
    ],
} as const;
