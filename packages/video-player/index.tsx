'use client';

import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from 'media-chrome/react';
import type { CSSProperties, ComponentProps } from 'react';

export type VideoPlayerProps = ComponentProps<typeof MediaController>;

const variables = {
  '--media-primary-color': 'hsl(var(--primary))',
  '--media-secondary-color': 'hsl(var(--background))',
  '--media-text-color': 'hsl(var(--foreground))',
  '--media-background-color': 'hsl(var(--background))',
  '--media-control-hover-background': 'hsl(var(--accent))',
  '--media-font-family': 'var(--font-sans)',
  '--media-live-button-icon-color': 'hsl(var(--muted-foreground))',
  '--media-live-button-indicator-color': 'hsl(var(--destructive))',
  '--media-range-track-background': 'hsl(var(--border))',
} as CSSProperties;

export const VideoPlayer = ({ style, ...props }: VideoPlayerProps) => (
  <MediaController
    style={{
      ...variables,
      ...style,
    }}
    {...props}
  />
);

export type VideoPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;

export const VideoPlayerControlBar = (props: VideoPlayerControlBarProps) => (
  <MediaControlBar {...props} />
);

export type VideoPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;

export const VideoPlayerTimeRange = (props: VideoPlayerTimeRangeProps) => (
  <MediaTimeRange {...props} />
);

export type VideoPlayerTimeDisplayProps = ComponentProps<
  typeof MediaTimeDisplay
>;

export const VideoPlayerTimeDisplay = (props: VideoPlayerTimeDisplayProps) => (
  <MediaTimeDisplay {...props} />
);

export type VideoPlayerVolumeRangeProps = ComponentProps<
  typeof MediaVolumeRange
>;

export const VideoPlayerVolumeRange = (props: VideoPlayerVolumeRangeProps) => (
  <MediaVolumeRange {...props} />
);

export type VideoPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>;

export const VideoPlayerPlayButton = (props: VideoPlayerPlayButtonProps) => (
  <MediaPlayButton {...props} />
);

export type VideoPlayerSeekBackwardButtonProps = ComponentProps<
  typeof MediaSeekBackwardButton
>;

export const VideoPlayerSeekBackwardButton = (
  props: VideoPlayerSeekBackwardButtonProps
) => <MediaSeekBackwardButton {...props} />;

export type VideoPlayerSeekForwardButtonProps = ComponentProps<
  typeof MediaSeekForwardButton
>;

export const VideoPlayerSeekForwardButton = (
  props: VideoPlayerSeekForwardButtonProps
) => <MediaSeekForwardButton {...props} />;

export type VideoPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>;

export const VideoPlayerMuteButton = (props: VideoPlayerMuteButtonProps) => (
  <MediaMuteButton {...props} />
);

export type VideoPlayerContentProps = ComponentProps<'video'>;

export const VideoPlayerContent = (props: VideoPlayerContentProps) => (
  <video {...props} />
);
