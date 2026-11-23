"use client";

import * as React from "react";

interface SectionErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

class SectionErrorBoundaryBase extends React.Component<
  SectionErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: SectionErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: unknown) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="py-24 text-center text-ink/60">
          <p>An error occurred loading this section.</p>
        </div>
      );
    }
    return <>{React.Children.toArray(this.props.children)}</>;
  }
}

export const SectionErrorBoundary: React.FC<SectionErrorBoundaryProps> = ({
  fallback,
  children,
}) => {
  return (
    <SectionErrorBoundaryBase fallback={fallback}>{children}</SectionErrorBoundaryBase>
  );
};