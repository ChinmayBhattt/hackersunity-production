import { Star } from 'lucide-react';
import { getInitials, getRandomBrandColor } from '@/utils/helpers';
import styles from './TestimonialCard.module.css';

export default function TestimonialCard({ testimonial }) {
  return (
    <div className={styles.card}>
      <div className={styles.stars}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            fill={i < testimonial.rating ? '#F5C875' : 'transparent'}
            stroke={i < testimonial.rating ? '#F5C875' : 'var(--text-dim)'}
          />
        ))}
      </div>

      <blockquote className={styles.quote}>
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      <div className={styles.author}>
        <div
          className={styles.avatar}
          style={{ background: getRandomBrandColor(testimonial.id) }}
        >
          {getInitials(testimonial.name)}
        </div>
        <div>
          <p className={styles.name}>{testimonial.name}</p>
          <p className={styles.college}>{testimonial.college}</p>
          <p className={styles.hackathon}>🏆 {testimonial.hackathon}</p>
        </div>
      </div>
    </div>
  );
}
