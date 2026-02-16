import { SkillCategory } from "@/types";

export const categories: SkillCategory[] = [
  {
    label: "Frontend",
    skills: [
      { name: "JavaScript", level: "Expert" },
      { name: "React.js", level: "Expert" },
      { name: "Next.js", level: "Expert" },
      { name: "Remix", level: "Advanced" },
      { name: "Gatsby.js", level: "Advanced" },
      { name: "TypeScript", level: "Expert" },
    ],
  },
  {
    label: "State Management",
    skills: [
      { name: "React Query", level: "Advanced" },
      { name: "Redux", level: "Expert" },
      { name: "Context API", level: "Expert" },
    ],
  },
  {
    label: "Web3 & Blockchain",
    skills: [
      { name: "CosmJS", level: "Advanced" },
      { name: "Web3Auth", level: "Advanced" },
      { name: "Cosmos Kit", level: "Advanced" },
      { name: "DeFi Wallets", level: "Advanced" },
      { name: "DFNS", level: "Intermediate" },
      { name: "Coinbase SDK", level: "Intermediate" },
    ],
  },
  {
    label: "Styling",
    skills: [
      { name: "Tailwind CSS", level: "Expert" },
      { name: "Material UI", level: "Advanced" },
      { name: "Styled Components", level: "Advanced" },
      { name: "Bootstrap", level: "Advanced" },
    ],
  },
  {
    label: "Cloud & DevOps",
    skills: [
      { name: "AWS S3", level: "Advanced" },
      { name: "CloudFront", level: "Advanced" },
      { name: "AWS Amplify", level: "Advanced" },
      { name: "Secrets Manager", level: "Advanced" },
      { name: "Webpack", level: "Advanced" },
      { name: "Vite", level: "Advanced" },
    ],
  },
  {
    label: "GenAI & AI Tools",
    skills: [
      { name: "Prompt Engineering", level: "Advanced" },
      { name: "AI-Assisted Development", level: "Advanced" },
      { name: "LLM Integration", level: "Advanced" },
      { name: "OpenAI API", level: "Advanced" },
      { name: "AI Agents", level: "Intermediate" },
      { name: "RAG Systems", level: "Intermediate" },
    ],
  },
  {
    label: "Backend & Languages",
    skills: [
      { name: "Go Lang", level: "Advanced" },
      { name: "Node.js", level: "Advanced" },
      { name: "REST APIs", level: "Expert" },
      { name: "GraphQL", level: "Intermediate" },
    ],
  },
];
