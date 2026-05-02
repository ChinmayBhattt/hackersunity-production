'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, Users, Trophy } from 'lucide-react';
import { getCountdown } from '@/utils/helpers';
import styles from './HackathonCard.module.css';

export default function HackathonCard({ hackathon }) {
  const [countdown, setCountdown] = useState(getCountdown(hackathon.deadline));

  useEffect(() => {
    if (hackathon.status === 'ENDED') return;
    const timer = setInterval(() => {
      setCountdown(getCountdown(hackathon.deadline));
    }, 1000);
    return () => clearInterval(timer);
  }, [hackathon.deadline, hackathon.status]);

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
        return <span className="badge badge-ended">ENDED</span>;
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

      {/* Countdown */}
      {hackathon.status !== 'ENDED' && (
        <div className={styles.countdown} aria-label={`Deadline countdown: ${countdown.days} days, ${countdown.hours} hours`}>
          <Clock size={14} />
          <div className={styles.countdownUnits}>
            <div className={styles.unit}>
              <span className={styles.unitValue}>{countdown.days}</span>
              <span className={styles.unitLabel}>d</span>
            </div>
            <span className={styles.separator}>:</span>
            <div className={styles.unit}>
              <span className={styles.unitValue}>{String(countdown.hours).padStart(2, '0')}</span>
              <span className={styles.unitLabel}>h</span>
            </div>
            <span className={styles.separator}>:</span>
            <div className={styles.unit}>
              <span className={styles.unitValue}>{String(countdown.minutes).padStart(2, '0')}</span>
              <span className={styles.unitLabel}>m</span>
            </div>
            <span className={styles.separator}>:</span>
            <div className={styles.unit}>
              <span className={styles.unitValue}>{String(countdown.seconds).padStart(2, '0')}</span>
              <span className={styles.unitLabel}>s</span>
            </div>
          </div>
        </div>
      )}

      {/* Tags */}
      <div className={styles.tags}>
        {hackathon.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
      </div>

      {/* CTA */}
      <div className={styles.cta}>
        <span className={`btn btn-primary btn-sm ${styles.registerBtn}`}>
          {hackathon.status === 'ENDED' ? 'View Results' : 'Register Now →'}
        </span>
      </div>
    </Link>
  );
}
