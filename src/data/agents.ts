import { Agent } from "@/types/agent";
import { AGENT } from "@/config/agent";

/**
 * Single-agent roster. MLS attribution (roster.ts) matches against this
 * list by DRE, so the agent's own listings surface their headshot and
 * contact details.
 */
export const agents: Agent[] = [
  {
    slug: "jamie-tian",
    name: AGENT.name,
    role: AGENT.title,
    phone: AGENT.phone,
    phoneHref: AGENT.phoneHref,
    email: AGENT.email,
    dre: AGENT.dre,
    image: AGENT.headshot,
    isLeadership: true,
  },
];

export const leadership = agents.filter((a) => a.isLeadership);
