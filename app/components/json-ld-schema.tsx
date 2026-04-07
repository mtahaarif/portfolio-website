import { profile } from '../data/profile';

const requiredSkills = ['PyTorch', 'OpenCV', 'Multimodal AI', 'Edge AI', 'LLMs'];

const profileDescription =
  'AI/ML and Computer Vision Engineer building edge-to-cloud multimodal systems with production ML pipelines.';

export function JsonLdSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${profile.website}#person`,
        name: profile.name,
        url: profile.website,
        image: `${profile.website}/profile.jpg`,
        email: profile.email,
        jobTitle: 'AI/ML Engineer',
        description: profileDescription,
        sameAs: [profile.github, profile.linkedIn],
        knowsAbout: requiredSkills,
      },
      {
        '@type': 'ProfilePage',
        '@id': `${profile.website}#profile-page`,
        url: profile.website,
        name: `${profile.name} Portfolio`,
        description: profileDescription,
        mainEntity: {
          '@id': `${profile.website}#person`,
        },
        about: requiredSkills.map((skill) => ({
          '@type': 'Thing',
          name: skill,
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
