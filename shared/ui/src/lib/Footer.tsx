import { LogoImageNeutral } from './LogoImageNeutral';

export interface FooterProps {
  className?: string;
}

export const Footer = ({ className }: FooterProps) => (
  <div className={className}>
    <LogoImageNeutral className="mx-auto h-12 w-12" />
  </div>
);
