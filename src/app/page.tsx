"use client";

import BlurFade from "@/components/ui/blur-fade";
import WordFadeIn from "@/components/ui/word-fade-in";
import { MagicCard } from "@/components/magic-card";
import Marquee from "@/components/ui/marquee";
import { DATA } from "@/data/resume";
import Link from "next/link";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { BorderBeam } from "@/components/ui/border-beam";
import Particles from "@/components/ui/particles";
import { Spotlight } from "@/components/ui/spotlight";
import { Download, Mail, Phone, Home as HomeIcon, User, Briefcase, Code, FileText, Linkedin, Github } from "lucide-react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { TextReveal } from "@/components/ui/text-reveal";

const BLUR_FADE_DELAY = 0.04;

const navItems = [
  { title: "Home", icon: <HomeIcon className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#hero" },
  { title: "About", icon: <User className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#about" },
  { title: "Work", icon: <Briefcase className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#work" },
  { title: "Projects", icon: <Code className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#projects" },
  { title: "Contact", icon: <Mail className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "#contact" },
  { title: "Resume", icon: <FileText className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: "/deepanshu_moorjani_fullstack.pdf" },
  { title: "LinkedIn", icon: <Linkedin className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: DATA.contact.social.LinkedIn.url },
  { title: "GitHub", icon: <Github className="h-full w-full text-neutral-500 dark:text-neutral-300" />, href: DATA.contact.social.GitHub.url },
];

export default function Home() {
  return (
    <main className="flex min-h-[100dvh] flex-col space-y-10 py-12 sm:py-24 px-6 md:px-24 bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      <Spotlight
        className="top-40 left-0 md:left-60 md:-top-20 opacity-70"
        fill="#dc2626"
      />
      <Particles
        className="absolute inset-0 z-0 h-full w-full"
        quantity={100}
        ease={80}
        color="#ffffff"
        refresh
      />
      <Particles
        className="absolute inset-0 z-0 h-full w-full opacity-60"
        quantity={80}
        ease={80}
        color="#ef4444"
        refresh
      />

      {/* Hero Section */}
      <section id="hero" className="z-10 relative">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <div className="gap-2 flex justify-between items-start">
            <div className="flex-col flex flex-1 space-y-4">
              <BlurFade delay={BLUR_FADE_DELAY} inView>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-neutral-400 animate-gradient">
                  Hi, I'm {DATA.name.split(" ")[0]}
                </h1>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 2} inView>
                <p className="max-w-[600px] md:text-xl text-neutral-500 dark:text-neutral-400">
                  {DATA.description}
                </p>
              </BlurFade>
              <BlurFade delay={BLUR_FADE_DELAY * 2.5} inView>
                <Link
                  href="/deepanshu_moorjani_fullstack.pdf"
                  target="_blank"
                  className="w-fit"
                >
                  <MagneticButton className="inline-flex items-center gap-2 px-4 py-2 mt-4 text-sm font-medium text-white bg-neutral-900 rounded-md hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 transition-colors">
                    <Download className="size-4" />
                    Download Resume
                  </MagneticButton>
                </Link>
              </BlurFade>
            </div>
            <BlurFade delay={BLUR_FADE_DELAY} inView>
              {/* Avatar with BorderBeam */}
              <div className="relative size-32 sm:size-64">
                <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-neutral-800">
                  <img
                    src="/profilepic.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                  <BorderBeam
                    size={100}
                    duration={10}
                    colorFrom="#fff"
                    colorTo="#fdf9f9ff"
                    borderWidth={3}
                  />
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="z-10 relative">
        <BlurFade delay={BLUR_FADE_DELAY * 3} inView>
          <div className="mx-auto w-full max-w-2xl space-y-4">
            <h2 className="text-xl font-bold">About</h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm md:text-base text-pretty font-sans hover:text-gray-100">
              {DATA.summary}
            </p>
          </div>
        </BlurFade>
      </section>

      {/* Work Experience with Tracing Beam */}
      <section id="work" className="z-10 relative">
        <BlurFade delay={BLUR_FADE_DELAY * 4} inView>
          {/* Centered title before beam */}
          <div className="mx-auto w-full max-w-2xl mb-8">
            <h2 className="text-xl font-bold">Work Experience</h2>
          </div>
        </BlurFade>

        <TracingBeam className="px-6">
          <div className="mx-auto w-full max-w-2xl flex flex-col gap-y-8 relative">
            {DATA.work.map((work, id) => (
              <BlurFade
                key={work.company}
                delay={BLUR_FADE_DELAY * 5 + id * 0.05}
                inView
              >
                <div className="flex flex-col space-y-1 pl-4 relative p-4 ">

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between  ">
                    <h3 className="font-semibold text-lg">{work.company}</h3>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400">{work.start} - {work.end}</span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{work.title}</p>
                  <ul className="list-disc list-inside text-xs text-neutral-500 dark:text-neutral-500 mt-2 space-y-1  hover:text-gray-100">
                    {work.description.map((point, i) => (
                      <li key={i} className="text-pretty">{point}</li>
                    ))}
                  </ul>
                </div>
              </BlurFade>
            ))}
          </div>
        </TracingBeam>
      </section>

      {/* Education - Adding briefly since it is in resume */}
      <section id="education" className="z-10 relative">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 6} inView>
            <h2 className="text-xl font-bold">Education</h2>
          </BlurFade>
          <div className="flex flex-col gap-y-4">
            {DATA.education.map((edu, id) => (
              <BlurFade
                key={edu.school}
                delay={BLUR_FADE_DELAY * 7 + id * 0.05}
                inView
              >
                <div className="flex flex-col space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    {edu.href ? (
                      <Link href={edu.href} target="_blank" className="hover:underline hover:text-red-500 transition-colors">
                        <h3 className="font-semibold">{edu.school}</h3>
                      </Link>
                    ) : (
                      <h3 className="font-semibold">{edu.school}</h3>
                    )}
                    <span className="text-xs text-neutral-500">{edu.start} - {edu.end}</span>
                  </div>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{edu.degree}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="z-10 relative">
        <div className="mx-auto w-full max-w-2xl space-y-8">
          <BlurFade delay={BLUR_FADE_DELAY * 8} inView>
            <h2 className="text-xl font-bold">Skills</h2>
          </BlurFade>
          <BlurFade delay={BLUR_FADE_DELAY * 9} inView>
            <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background py-4 sm:py-8 md:py-12">
              <Marquee pauseOnHover className="[--duration:20s]">
                {DATA.skills.map((skill) => (
                  <div key={skill} className="rounded px-2 py-1 text-sm">
                    {skill}
                  </div>
                ))}
              </Marquee>
              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
            </div>
          </BlurFade>
        </div>
      </section>

      {/* Innovative Bottom Section (Projects + Contact) */}
      <div className="relative w-full z-10 overflow-hidden bg-gradient-to-t from-black via-neutral-950 to-transparent pb-10">

        {/* Bottom Spotlight Effect */}
        <Spotlight
          className="bottom-0 right-0 transform rotate-180 opacity-60 z-0"
          fill="#ef4444"
        />
        <Particles
          className="absolute inset-0 z-0 h-full w-full opacity-40 pointer-events-none"
          quantity={60}
          ease={80}
          color="#ef4444"
          refresh
        />

        <section id="projects" className="z-10 relative pt-12">
          <div className="space-y-12 w-full py-12">
            <BlurFade delay={BLUR_FADE_DELAY * 10} inView>
              <div className="flex flex-col items-center justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                    My Projects
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Check out my latest work
                  </h2>
                  <p className="text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
                    I've worked on a variety of projects, from simple websites to complex web applications. Here are a few of my favorites.
                  </p>
                </div>
              </div>
            </BlurFade>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-[800px] mx-auto px-4">
              {DATA.projects.slice().reverse().map((project, id) => (
                <BlurFade
                  key={project.title}
                  delay={BLUR_FADE_DELAY * 11 + id * 0.05}
                  inView
                >
                  <MagicCard className="coursor-pointer flex-col items-start p-6 w-full h-full min-h-[300px] relative overflow-hidden group" gradientColor="#450a0a">
                    <Link href={project.href || "#"} target="_blank" className="block cursor-pointer w-full h-full">
                      <div className="flex flex-col w-full h-full justify-between z-10 relative">
                        <div className="space-y-2">
                          <h3 className="text-xl font-bold group-hover:text-red-500 transition-colors">{project.title}</h3>
                          <p className="text-xs text-neutral-500 dark:text-neutral-400">{project.dates}</p>
                          <p className="text-sm text-neutral-500 dark:text-neutral-400">{project.description}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.technologies.map((tech) => (
                            <span key={tech} className="px-2 py-1 text-[10px] bg-neutral-200 dark:bg-neutral-800 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </Link>
                    <BorderBeam size={100} duration={8} delay={0} colorFrom="#ef4444" colorTo="#b91c1c" />
                  </MagicCard>
                </BlurFade>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="z-10 relative pb-24">
          <div className="grid items-center justify-center gap-4 px-4 text-center md:px-6 w-full py-12">
            <BlurFade delay={BLUR_FADE_DELAY * 12} inView>
              <div className="space-y-3">
                <div className="inline-block rounded-lg bg-foreground text-background px-3 py-1 text-sm">
                  Contact
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Get in Touch
                </h2>
                <p className="mx-auto max-w-[600px] text-neutral-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-neutral-400">
                  Ready to start a project together? Reach out!
                </p>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8">
                  <Link href={`mailto:${DATA.contact.email}`}>
                    <MagneticButton className="group flex items-center gap-3 px-5 py-3 rounded-full bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm">
                      <div className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-red-500/10 group-hover:text-red-500 transition-colors">
                        <Mail className="size-4" />
                      </div>
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300 group-hover:text-foreground transition-colors">{DATA.contact.email}</span>
                    </MagneticButton>
                  </Link>

                  <Link href={`tel:${DATA.contact.tel}`}>
                    <MagneticButton className="group flex items-center gap-3 px-5 py-3 rounded-full bg-neutral-100/50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-800 hover:border-red-500/50 transition-all duration-300 backdrop-blur-sm">
                      <div className="p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 group-hover:bg-red-500/10 group-hover:text-red-500 transition-colors">
                        <Phone className="size-4" />
                      </div>
                      <span className="text-sm font-medium text-neutral-600 dark:text-neutral-300 group-hover:text-foreground transition-colors">{DATA.contact.tel}</span>
                    </MagneticButton>
                  </Link>
                </div>

                <div className="flex justify-center gap-4 mt-8">
                  <Link href={DATA.contact.social.GitHub.url} target="_blank">
                    <MagneticButton className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition">
                      <Github className="size-6" />
                    </MagneticButton>
                  </Link>
                  <Link href={DATA.contact.social.LinkedIn.url} target="_blank">
                    <MagneticButton className="p-3 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition">
                      <Linkedin className="size-6" />
                    </MagneticButton>
                  </Link>
                </div>
              </div>
            </BlurFade>
          </div>
        </section>
      </div>
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-50">
        <FloatingDock items={navItems} />
      </div>
    </main>
  );
}
