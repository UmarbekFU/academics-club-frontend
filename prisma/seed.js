const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create authors
  const authors = await Promise.all([
    prisma.author.upsert({
      where: { email: 'david.chen@theacademicsclub.com' },
      update: {},
      create: {
        name: 'David Chen',
        email: 'david.chen@theacademicsclub.com',
        bio: 'Published author and writing instructor with 10+ years of experience in academic writing.',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
      }
    }),
    prisma.author.upsert({
      where: { email: 'sarah.johnson@theacademicsclub.com' },
      update: {},
      create: {
        name: 'Sarah Johnson',
        email: 'sarah.johnson@theacademicsclub.com',
        bio: 'Former university writing center director specializing in student writing development.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
      }
    }),
    prisma.author.upsert({
      where: { email: 'anna.williams@theacademicsclub.com' },
      update: {},
      create: {
        name: 'Anna Williams',
        email: 'anna.williams@theacademicsclub.com',
        bio: 'Former admissions officer with 8+ years of experience helping students craft compelling applications.',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
      }
    }),
    prisma.author.upsert({
      where: { email: 'maya.patel@theacademicsclub.com' },
      update: {},
      create: {
        name: 'Maya Patel',
        email: 'maya.patel@theacademicsclub.com',
        bio: 'Former Ivy League admissions reader with expertise in holistic application review and strategy.',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
      }
    }),
    prisma.author.upsert({
      where: { email: 'john.rivera@theacademicsclub.com' },
      update: {},
      create: {
        name: 'John Rivera',
        email: 'john.rivera@theacademicsclub.com',
        bio: 'Professional editor specializing in college admissions essays with 8+ years of experience.',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
      }
    })
  ]);

  console.log('✅ Authors created:', authors.length);

  // Create blog posts
  const blogPosts = [
    {
      title: 'How to Find Your Voice in College Essays',
      slug: 'how-to-find-your-voice-in-college-essays',
      content: `# How to Find Your Voice in College Essays

Discovering your authentic voice is one of the most challenging aspects of writing college essays. Many students struggle with this because they're trying to sound like someone else or write what they think admissions officers want to hear.

## What is Your Voice?

Your voice is the unique way you express yourself through writing. It's a combination of:
- Your personality and perspective
- Your writing style and tone
- Your experiences and values
- Your authentic self

## Steps to Find Your Voice

### 1. Self-Reflection
Take time to think about what makes you unique. Consider:
- What experiences have shaped you?
- What values do you hold dear?
- What are your passions and interests?
- How do you see the world differently?

### 2. Write Without Filters
Start by writing freely without worrying about grammar, structure, or what others might think. This helps you access your natural voice.

### 3. Read Your Writing Aloud
When you read your writing aloud, you can hear if it sounds like you. If it doesn't, revise until it does.

### 4. Get Feedback
Ask trusted friends, family, or teachers to read your essays and tell you if they sound like you.

## Common Mistakes to Avoid

- **Trying to sound overly academic**: Use your natural language
- **Copying other people's styles**: Be yourself
- **Using clichés**: Find fresh ways to express common ideas
- **Being too formal**: Let your personality shine through

Remember, admissions officers want to get to know the real you through your essays. Your authentic voice is your greatest asset.`,
      excerpt: 'Discover the key to writing authentic college essays that truly represent who you are. Learn techniques for uncovering your unique voice and perspective.',
      published: true,
      featured: true,
      tags: 'Essay Writing, Voice, Authenticity',
      authorId: authors[0].id
    },
    {
      title: 'Top 5 Writing Mistakes Students Make',
      slug: 'top-5-writing-mistakes-students-make',
      content: `# Top 5 Writing Mistakes Students Make

Avoiding these common writing pitfalls can significantly improve your college essays and academic writing.

## 1. Weak Opening Sentences

**The Problem**: Starting with generic statements like "Throughout my life..." or "I have always been..."

**The Solution**: Start with a specific moment, dialogue, or vivid description that draws the reader in.

## 2. Telling Instead of Showing

**The Problem**: Simply stating facts about yourself without providing evidence or examples.

**The Solution**: Use specific examples, anecdotes, and details to illustrate your points.

## 3. Lack of Focus

**The Problem**: Trying to cover too many topics in one essay, resulting in shallow treatment of each.

**The Solution**: Choose one main theme or experience and explore it in depth.

## 4. Poor Organization

**The Problem**: Jumping between ideas without clear transitions or logical flow.

**The Solution**: Create an outline and use transition words to connect your ideas smoothly.

## 5. Weak Conclusions

**The Problem**: Ending abruptly or simply restating the introduction.

**The Solution**: Reflect on what you've learned, how you've grown, or what this experience means for your future.

## Bonus Tip: Proofreading

Always proofread your essays carefully. Simple spelling and grammar errors can undermine even the best content.`,
      excerpt: 'Avoid these common writing pitfalls that can hurt your college applications. Learn how to identify and fix these mistakes before submitting your essays.',
      published: true,
      featured: false,
      tags: 'Writing Tips, Common Mistakes, Essay Writing',
      authorId: authors[1].id
    },
    {
      title: 'From Draft to Admission: A Student Success Story',
      slug: 'from-draft-to-admission-student-success-story',
      content: `# From Draft to Admission: A Student Success Story

Meet Maria, a high school senior who transformed her initial essay draft into a compelling narrative that helped her gain admission to her dream school.

## The Challenge

Maria's first draft was generic and unfocused. She wrote about being "passionate about helping others" without providing specific examples or showing how this passion had developed.

## The Transformation Process

### Week 1: Finding the Story
We helped Maria identify a specific moment when her passion for helping others crystallized - volunteering at a local food bank during the pandemic.

### Week 2: Developing the Narrative
We worked on showing rather than telling, using specific details about her experiences and the people she met.

### Week 3: Refining the Voice
Maria's natural warmth and empathy began to shine through as she wrote in her authentic voice.

### Week 4: Polishing the Final Draft
The final essay was compelling, specific, and authentically Maria.

## The Result

Maria was accepted to her top-choice school and received a scholarship. The admissions officer specifically mentioned her essay in the acceptance letter.

## Key Takeaways

- Specific stories are more powerful than general statements
- Authentic voice makes essays memorable
- The revision process is crucial for success
- Professional guidance can make a significant difference`,
      excerpt: 'Follow the journey of Maria, who transformed her initial essay draft into a compelling narrative that helped her gain admission to her dream school.',
      published: true,
      featured: true,
      tags: 'Success Stories, Essay Writing, Admissions',
      authorId: authors[2].id
    },
    {
      title: 'Understanding the Common Application Essay Prompts',
      slug: 'understanding-common-application-essay-prompts',
      content: `# Understanding the Common Application Essay Prompts

A comprehensive guide to the Common Application essay prompts and how to approach each one effectively.

## The 2024-2025 Common App Prompts

### Prompt 1: Background, Identity, Interest, or Talent
**Prompt**: "Some students have a background, identity, interest, or talent that is so meaningful they believe their application would be incomplete without it. If this sounds like you, then please share your story."

**Best for**: Students with unique backgrounds, cultural identities, or special talents.

### Prompt 2: Failure or Setback
**Prompt**: "The lessons we take from obstacles we encounter can be fundamental to later success. Recount a time when you faced a challenge, setback, or failure. How did it affect you, and what did you learn from the experience?"

**Best for**: Students who have overcome significant challenges or learned from failures.

### Prompt 3: Belief or Idea
**Prompt**: "Reflect on a time when you questioned or challenged a belief or idea. What prompted your thinking? What was the outcome?"

**Best for**: Students who are intellectually curious and willing to challenge conventional wisdom.

### Prompt 4: Accomplishment or Event
**Prompt**: "Reflect on something that someone has done for you that has made you happy or thankful in a surprising way. How has this gratitude affected or motivated you?"

**Best for**: Students who have been deeply impacted by others' kindness or support.

### Prompt 5: Personal Growth
**Prompt**: "Discuss an accomplishment, event, or realization that sparked a period of personal growth and a new understanding of yourself or others."

**Best for**: Students who have experienced significant personal development.

### Prompt 6: Topic of Your Choice
**Prompt**: "Share an essay on any topic of your choice. It can be one you've already written, one that responds to a different prompt, or one of your own design."

**Best for**: Students with unique stories that don't fit other prompts.

## Choosing the Right Prompt

Consider which prompt allows you to:
- Tell your most compelling story
- Showcase your unique qualities
- Demonstrate growth and reflection
- Connect to your future goals

## Writing Tips for Any Prompt

1. **Be specific**: Use concrete details and examples
2. **Show growth**: Demonstrate how you've learned or changed
3. **Be authentic**: Write in your natural voice
4. **Stay focused**: Stick to one main theme
5. **Revise thoroughly**: Multiple drafts lead to better essays`,
      excerpt: 'A comprehensive guide to the Common Application essay prompts and how to approach each one effectively. Get expert tips for choosing the right prompt for your story.',
      published: true,
      featured: false,
      tags: 'Admissions Tips, Common App, Essay Prompts',
      authorId: authors[3].id
    },
    {
      title: 'Building a Strong Extracurricular Profile',
      slug: 'building-strong-extracurricular-profile',
      content: `# Building a Strong Extracurricular Profile

Learn how to showcase your extracurricular activities effectively in your college applications.

## What Admissions Officers Look For

### Depth Over Breadth
It's better to be deeply involved in a few activities than superficially involved in many.

### Leadership and Initiative
Show how you've taken initiative or demonstrated leadership in your activities.

### Impact and Growth
Demonstrate how your activities have made a difference and how you've grown through them.

## Types of Extracurricular Activities

### Academic Activities
- Debate team
- Science Olympiad
- Math competitions
- Academic clubs

### Community Service
- Volunteer work
- Service organizations
- Community projects
- Fundraising efforts

### Arts and Culture
- Music, theater, or dance
- Visual arts
- Creative writing
- Cultural organizations

### Sports and Athletics
- Team sports
- Individual sports
- Coaching or mentoring
- Athletic leadership

### Work and Internships
- Part-time jobs
- Internships
- Entrepreneurship
- Professional experiences

## How to Present Your Activities

### Activity Descriptions
Write compelling descriptions that highlight:
- Your specific role and responsibilities
- The impact you made
- Skills you developed
- Time commitment

### Essays About Activities
When writing about activities in essays:
- Focus on specific moments or experiences
- Show personal growth and learning
- Connect activities to your future goals
- Demonstrate your values and character

## Common Mistakes to Avoid

- **Listing without context**: Provide details about your involvement
- **Overstating your role**: Be honest about your contributions
- **Focusing only on achievements**: Show the process and learning
- **Ignoring smaller activities**: Sometimes small activities can be very meaningful

## Making the Most of Your Activities

1. **Document your experiences**: Keep a journal of your activities
2. **Seek leadership opportunities**: Look for ways to take initiative
3. **Reflect on your growth**: Think about what you've learned
4. **Connect activities to goals**: Show how they relate to your future plans

Remember, admissions officers want to see the real you through your activities. Choose activities that genuinely interest you and where you can make a meaningful contribution.`,
      excerpt: 'Learn how to showcase your extracurricular activities effectively in your college applications. Discover what admissions officers are really looking for.',
      published: true,
      featured: false,
      tags: 'Admissions Tips, Extracurriculars, Applications',
      authorId: authors[4].id
    },
    {
      title: 'The Art of Storytelling in College Essays',
      slug: 'art-of-storytelling-in-college-essays',
      content: `# The Art of Storytelling in College Essays

Master the fundamentals of storytelling to create compelling college essays that admissions officers will remember.

## Why Storytelling Matters

Great college essays tell stories. They transport readers into your world, help them understand your experiences, and create emotional connections that make your application memorable.

## Elements of Effective Storytelling

### 1. Strong Opening
Hook your reader from the first sentence with:
- A compelling scene or moment
- Intriguing dialogue
- A surprising statement
- A vivid description

### 2. Clear Structure
Organize your story with:
- **Beginning**: Set the scene and introduce the conflict
- **Middle**: Develop the story and show your response
- **End**: Resolve the conflict and show growth

### 3. Vivid Details
Use specific, sensory details to bring your story to life:
- What did you see, hear, feel, smell, or taste?
- What were the specific circumstances?
- Who else was involved?

### 4. Character Development
Show how you changed or grew through the experience:
- What did you learn about yourself?
- How did your perspective change?
- What new skills or insights did you gain?

## Storytelling Techniques

### Show, Don't Tell
Instead of saying "I was nervous," describe your sweaty palms, racing heart, or shaky voice.

### Use Dialogue
Include conversations that reveal character and advance the plot.

### Create Tension
Build suspense by showing obstacles, challenges, or conflicts you faced.

### Use Metaphors and Imagery
Compare your experiences to other things to help readers understand and remember.

## Common Storytelling Mistakes

- **Starting too broadly**: Jump into the specific moment
- **Including irrelevant details**: Focus on what matters to your story
- **Telling instead of showing**: Use specific examples and details
- **Weak endings**: End with reflection or growth, not just resolution

## Types of Stories That Work Well

### Overcoming Challenges
Stories about facing and overcoming obstacles show resilience and growth.

### Moments of Discovery
Stories about learning something new about yourself or the world.

### Helping Others
Stories about making a difference in someone else's life.

### Personal Growth
Stories about changing perspectives or developing new skills.

## Writing Your Story

1. **Choose your moment**: Pick a specific, meaningful experience
2. **Outline the structure**: Plan your beginning, middle, and end
3. **Write the first draft**: Don't worry about perfection
4. **Revise for clarity**: Make sure your story is easy to follow
5. **Add vivid details**: Include specific, sensory information
6. **Show your growth**: Demonstrate how you changed or learned

Remember, the best stories are authentic, specific, and show who you really are. Your unique experiences and perspective are what make your story worth telling.`,
      excerpt: 'Master the fundamentals of storytelling to create compelling college essays. Learn narrative techniques that will make your essays memorable and impactful.',
      published: true,
      featured: true,
      tags: 'Essay Writing, Storytelling, Narrative Techniques',
      authorId: authors[0].id
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: {},
      create: post
    });
  }

  console.log('✅ Blog posts created:', blogPosts.length);

  // Create team members
  const teamMembers = [
    {
      name: 'Anna Williams',
      position: 'Founder & Program Director',
      bio: 'Former admissions officer with 8+ years of experience helping students craft compelling applications.',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      email: 'anna@theacademicsclub.com',
      linkedin: 'https://linkedin.com/in/anna-williams',
      twitter: 'https://twitter.com/anna_williams',
      order: 1,
      active: true
    },
    {
      name: 'David Chen',
      position: 'Lead Writing Coach',
      bio: 'Published author and writing instructor specializing in academic and creative writing techniques.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
      email: 'david@theacademicsclub.com',
      linkedin: 'https://linkedin.com/in/david-chen',
      twitter: 'https://twitter.com/david_chen',
      order: 2,
      active: true
    },
    {
      name: 'Maya Patel',
      position: 'Admissions Consultant',
      bio: 'Former Ivy League admissions reader with expertise in holistic application review and strategy.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      email: 'maya@theacademicsclub.com',
      linkedin: 'https://linkedin.com/in/maya-patel',
      twitter: 'https://twitter.com/maya_patel',
      order: 3,
      active: true
    },
    {
      name: 'John Rivera',
      position: 'Essay Editor',
      bio: 'Professional editor specializing in college admissions essays with 8+ years of experience.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      email: 'john@theacademicsclub.com',
      linkedin: 'https://linkedin.com/in/john-rivera',
      twitter: 'https://twitter.com/john_rivera',
      order: 4,
      active: true
    },
    {
      name: 'Sarah Johnson',
      position: 'Academic Writing Specialist',
      bio: 'Former university writing center director specializing in student writing development.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      email: 'sarah@theacademicsclub.com',
      linkedin: 'https://linkedin.com/in/sarah-johnson',
      twitter: 'https://twitter.com/sarah_johnson',
      order: 5,
      active: true
    },
    {
      name: 'Michael Thompson',
      position: 'Student Success Coordinator',
      bio: 'Dedicated to ensuring every student receives personalized attention and support throughout their journey.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
      email: 'michael@theacademicsclub.com',
      linkedin: 'https://linkedin.com/in/michael-thompson',
      twitter: 'https://twitter.com/michael_thompson',
      order: 6,
      active: true
    }
  ];

  for (const member of teamMembers) {
    await prisma.teamMember.upsert({
      where: { email: member.email },
      update: {},
      create: member
    });
  }

  console.log('✅ Team members created:', teamMembers.length);

  // Create programs
  const programs = [
    {
      name: 'Writing Program',
      slug: 'writing-program',
      description: 'Build strong writing skills for academic success with our comprehensive 6-week program.',
      content: `Our Writing Program is designed to help students develop fundamental writing skills that will serve them throughout their academic and professional careers.

## Program Overview
- **Duration**: 6 weeks
- **Format**: Small group sessions (max 8 students) + optional 1:1 sessions
- **Schedule**: 2 sessions per week (1.5 hours each)
- **Level**: Foundation to Intermediate

## What You'll Learn
- Grammar fundamentals and sentence structure
- Paragraph development and organization
- Academic writing techniques
- Essay structure and logical flow
- Research integration and citation methods
- Self-editing and peer review skills

## Curriculum
1. **Week 1**: Foundation Building - Grammar, sentence structure, writing basics
2. **Week 2**: Style and Voice - Finding your voice, tone, word choice
3. **Week 3**: Structure and Organization - Essay structure, transitions, outlining
4. **Week 4**: Academic Writing - Research integration, argumentation, critical thinking
5. **Week 5**: Revision and Editing - Self-editing techniques, peer review
6. **Week 6**: Application and Beyond - Admission essays, portfolio development

## Outcomes
By the end of this program, you'll have:
- Improved grammar and sentence structure
- Enhanced clarity in written communication
- Academic readiness for college-level writing
- Foundation skills for admission essays

## Instructors
- David Chen (Lead Writing Coach)
- Sarah Johnson (Academic Writing Specialist)

## Investment
$1,200 for the complete 6-week program
$200 for individual 1:1 sessions (optional)`,
      duration: '6 weeks',
      level: 'Foundation',
      price: 1200.00,
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
      active: true
    },
    {
      name: 'Essays Program',
      slug: 'essays-program',
      description: 'Craft compelling college application essays with guidance from admissions experts.',
      content: `Our Essays Program focuses specifically on college application essays, helping students craft compelling narratives that showcase their authentic voice and unique qualities.

## Program Overview
- **Duration**: 4 weeks
- **Format**: 1:1 personalized coaching sessions
- **Schedule**: 2 sessions per week (1 hour each)
- **Level**: Advanced

## What You'll Learn
- Personalized essay coaching
- Common App and supplemental essays
- Multiple rounds of feedback
- Brainstorming and topic selection
- Story development techniques
- College-specific strategies
- Final proofreading and polish

## Curriculum
1. **Week 1**: Discovery & Brainstorming - Self-reflection, topic exploration, story selection
2. **Week 2**: Story Development - Narrative structure, show don't tell, voice and authenticity
3. **Week 3**: Revision & Refinement - Feedback integration, content strengthening, clarity
4. **Week 4**: Polish & Submit - Final edits, proofreading, college-specific tweaks

## Essay Types We Cover
- Common Application essays
- Supplemental essays
- Coalition App essays
- UC Personal Insights (PIQs)
- College-specific prompts

## Outcomes
By the end of this program, you'll have:
- Authentic voice in your essays
- Competitive edge over other applicants
- Expert feedback from former admissions officers
- Submission-ready essays

## Instructors
- Michael Rodriguez (Former MIT Admissions Officer)
- Emily Watson (College Essay Specialist)

## Investment
$1,800 for the complete 4-week program
$300 for individual 1:1 sessions (optional)`,
      duration: '4 weeks',
      level: 'Advanced',
      price: 1800.00,
      image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2073&q=80',
      active: true
    }
  ];

  for (const program of programs) {
    await prisma.program.upsert({
      where: { slug: program.slug },
      update: {},
      create: program
    });
  }

  console.log('✅ Programs created:', programs.length);

  // Create admin user (only in development)
  if (process.env.NODE_ENV === 'production') {
    console.log('⚠️  Skipping admin user creation in production');
    console.log('⚠️  Please create admin user manually or via environment variables');
  } else {
    const bcrypt = require('bcryptjs');
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@theacademicsclub.com';
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await prisma.admin.upsert({
      where: { email: adminEmail },
      update: {},
      create: {
        username: adminUsername,
        email: adminEmail,
        password: hashedPassword,
        role: 'admin'
      }
    });

    console.log(`✅ Admin user created: ${adminEmail}`);
    if (adminPassword === 'admin123') {
      console.log('⚠️  Using default password "admin123" - change ADMIN_PASSWORD in production');
    }
  }


  // Create resources
  const resources = [
    {
      title: 'Ultimate College Essay Starter Guide',
      description: 'Learn the fundamentals of writing compelling college essays that stand out to admissions officers.',
      type: 'PDF Guide',
      pages: '25 pages',
      downloads: 2500,
      highlights: JSON.stringify([
        'Essay structure breakdown',
        '10+ proven prompts',
        'Common mistakes to avoid',
        'Real accepted examples'
      ]),
      fileUrl: '/resources/ultimate-college-essay-guide.pdf',
      active: true
    },
    {
      title: 'Personal Statement Template Pack',
      description: 'Customizable templates for Common App, Coalition App, and supplemental essays.',
      type: 'Templates',
      pages: '15 templates',
      downloads: 1800,
      highlights: JSON.stringify([
        'Common App essays',
        'Supplemental prompts',
        'Activity descriptions',
        'Why this college?'
      ]),
      fileUrl: '/resources/personal-statement-templates.zip',
      active: true
    },
    {
      title: '50 Powerful Essay Hooks',
      description: 'Attention-grabbing opening lines and techniques to make your essay memorable from the first sentence.',
      type: 'Worksheet',
      pages: '12 pages',
      downloads: 3200,
      highlights: JSON.stringify([
        'Hook formulas',
        'Real examples',
        'Practice exercises',
        'Before/after comparisons'
      ]),
      fileUrl: '/resources/essay-hooks-worksheet.pdf',
      active: true
    },
    {
      title: 'Application Timeline Checklist',
      description: 'Month-by-month guide to stay organized and meet all your college application deadlines.',
      type: 'Checklist',
      pages: '8 pages',
      downloads: 2100,
      highlights: JSON.stringify([
        'Timeline by grade',
        'Key deadlines',
        'Application tracker',
        'Essay planning calendar'
      ]),
      fileUrl: '/resources/application-timeline.pdf',
      active: true
    }
  ];

  for (const resource of resources) {
    await prisma.resource.upsert({
      where: { title: resource.title },
      update: {},
      create: resource
    });
  }

  console.log('✅ Resources created:', resources.length);

  console.log('🎉 Database seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
