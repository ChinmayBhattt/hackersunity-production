'use client';

import Link from 'next/link';
import { Users, Trophy } from 'lucide-react';
import styles from './HackathonCard.module.css';

export default function HackathonCard({ hackathon }) {
  const statusBadge = () => {
    switch (hackathon.status) {
      case 'LIVE':
        return (
          <span className="badge badge-live">
            <span className="pulse-dot" />
            LIVE
          </span>
        );
      case 'UPCOMING':
        return <span className="badge badge-upcoming">UPCOMING</span>;
      case 'ENDED':
      case 'COMPLETED':
        return <span className="badge badge-ended">COMPLETED</span>;
      default:
        return null;
    }
  };

  return (
    <Link href={`/hackathons/${hackathon.id}`} className={styles.card}>
      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.orgInfo}>
          <span className={styles.orgLogo}>{hackathon.organizerLogo}</span>
          <span className={styles.orgName}>{hackathon.organizer}</span>
        </div>
        {statusBadge()}
      </div>

      {/* Title */}
      <h3 className={styles.title}>{hackathon.name}</h3>

      {/* Prize */}
      <div className={styles.prize}>
        <Trophy size={16} />
        <span className={styles.prizeAmount}>{hackathon.prize}</span>
      </div>

      {/* Meta */}
      <div className={styles.meta}>
        <div className={styles.metaItem}>
          <Users size={14} />
          <span>{hackathon.teamSize} members</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.modeBadge}>{hackathon.mode}</span>
        </div>
      </div>

      {/* Tags */}
      <div className={styles.tags}>
        {hackathon.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <span className={`btn btn-primary btn-sm ${styles.registerBtn}`}>
          {hackathon.status === 'ENDED' || hackathon.status === 'COMPLETED' ? 'View Results' : 'Open Now →'}
        </span>
      </div>
    </Link>
  );
}
