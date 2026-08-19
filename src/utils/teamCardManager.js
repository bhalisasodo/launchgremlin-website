/**
 * Multi-Employee Team & Corporate Card Directory Manager
 * Enables company-wide card template syncing, CSV batch import/export,
 * and team member QR code generation.
 */

const TEAM_STORAGE_KEY = 'lg_team_directory_v1';

export const SAMPLE_TEAM_DATA = {
  companyName: 'LaunchGremlin Growth Group',
  companyTagline: 'Rapid Digital Storefronts & Growth Consulting',
  companyWebsite: 'https://launchgremlin.co.za',
  companyPhone: '+27 31 000 1234',
  companyWhatsapp: '+27 82 000 0000',
  brandTheme: 'emerald',
  accentColor: '#10b981',
  members: [
    {
      id: 'mem_1',
      fullName: 'Alex Morgan',
      jobTitle: 'Founder & Head of Growth',
      phone: '+27 82 123 4567',
      whatsapp: '+27 82 123 4567',
      email: 'alex@launchgremlin.co.za',
      slug: 'alex-morgan',
      bio: 'Leading technical strategy, digital storefront builds, and AI automation sprints.'
    },
    {
      id: 'mem_2',
      fullName: 'Elena Rostova',
      jobTitle: 'Creative Director & UI/UX',
      phone: '+27 83 234 5678',
      whatsapp: '+27 83 234 5678',
      email: 'elena@launchgremlin.co.za',
      slug: 'elena-rostova',
      bio: 'Crafting ultra-clean mobile visual design and high-conversion landing page layouts.'
    },
    {
      id: 'mem_3',
      fullName: 'Marcus Ndlovu',
      jobTitle: 'Technical Operations & Lead Dev',
      phone: '+27 84 345 6789',
      whatsapp: '+27 84 345 6789',
      email: 'marcus@launchgremlin.co.za',
      slug: 'marcus-ndlovu',
      bio: 'Architecting zero-bloat modern tech stacks and high-speed cloud infrastructure.'
    },
    {
      id: 'mem_4',
      fullName: 'Dr. Sarah Moodley',
      jobTitle: 'Principal Growth Consultant',
      phone: '+27 82 456 7890',
      whatsapp: '+27 82 456 7890',
      email: 'sarah@launchgremlin.co.za',
      slug: 'sarah-moodley',
      bio: 'Advising South African SMEs on digital conversion funnels and automated sales pipelines.'
    }
  ]
};

export const teamManager = {
  getTeamData: () => {
    try {
      const stored = localStorage.getItem(TEAM_STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(SAMPLE_TEAM_DATA));
    return SAMPLE_TEAM_DATA;
  },

  saveTeamData: (teamData) => {
    localStorage.setItem(TEAM_STORAGE_KEY, JSON.stringify(teamData));
    return teamData;
  },

  addMember: (member) => {
    const team = teamManager.getTeamData();
    const newMember = {
      id: `mem_${Date.now().toString().slice(-4)}`,
      slug: member.fullName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      ...member
    };
    team.members = [newMember, ...team.members];
    teamManager.saveTeamData(team);
    return newMember;
  },

  updateMember: (memberId, updatedFields) => {
    const team = teamManager.getTeamData();
    team.members = team.members.map((m) => (m.id === memberId ? { ...m, ...updatedFields } : m));
    teamManager.saveTeamData(team);
    return team;
  },

  deleteMember: (memberId) => {
    const team = teamManager.getTeamData();
    team.members = team.members.filter((m) => m.id !== memberId);
    teamManager.saveTeamData(team);
    return team;
  },

  // Export all team members to CSV
  exportTeamToCsv: (teamData) => {
    const headers = ['Full Name', 'Job Title', 'Email', 'Phone', 'WhatsApp', 'Slug', 'Bio'];
    const rows = teamData.members.map((m) => [
      `"${m.fullName || ''}"`,
      `"${m.jobTitle || ''}"`,
      `"${m.email || ''}"`,
      `"${m.phone || ''}"`,
      `"${m.whatsapp || ''}"`,
      `"${m.slug || ''}"`,
      `"${(m.bio || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${(teamData.companyName || 'team').toLowerCase().replace(/\s+/g, '_')}_team_cards.csv`;
    link.click();
  },

  // Import team members from CSV string
  importTeamFromCsv: (csvText) => {
    const lines = csvText.split('\n').filter(Boolean);
    if (lines.length < 2) return [];

    const newMembers = [];
    for (let i = 1; i < lines.length; i++) {
      const parts = lines[i].split(',').map((p) => p.replace(/^"|"$/g, '').trim());
      if (parts[0]) {
        newMembers.push({
          id: `mem_${Date.now().toString().slice(-4)}_${i}`,
          fullName: parts[0] || 'Team Member',
          jobTitle: parts[1] || 'Specialist',
          email: parts[2] || '',
          phone: parts[3] || '',
          whatsapp: parts[4] || parts[3] || '',
          slug: parts[5] || parts[0].toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          bio: parts[6] || ''
        });
      }
    }

    const team = teamManager.getTeamData();
    team.members = [...newMembers, ...team.members];
    teamManager.saveTeamData(team);
    return team;
  }
};
