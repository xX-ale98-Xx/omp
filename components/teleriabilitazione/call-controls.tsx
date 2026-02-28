'use client'

import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  ScreenShare,
  ScreenShareOff,
  StickyNote,
  PhoneOff,
} from 'lucide-react'
import { Button } from '@/components/shadcn/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/shadcn/ui/tooltip'

interface CallControlsProps {
  micOn: boolean
  videoOn: boolean
  screenShare: boolean
  showNotes: boolean
  onToggleMic: () => void
  onToggleVideo: () => void
  onToggleScreenShare: () => void
  onToggleNotes: () => void
  onEndCall: () => void
}

export function CallControls({
  micOn,
  videoOn,
  screenShare,
  showNotes,
  onToggleMic,
  onToggleVideo,
  onToggleScreenShare,
  onToggleNotes,
  onEndCall,
}: CallControlsProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <div className="flex items-center justify-center gap-2 border-t bg-card px-4 py-3 sm:gap-3">
        {/* Mic */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={micOn ? 'outline' : 'secondary'}
              size="icon"
              className={!micOn ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/60' : ''}
              onClick={onToggleMic}
            >
              {micOn ? <Mic className="size-4" /> : <MicOff className="size-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{micOn ? 'Disattiva microfono' : 'Attiva microfono'}</TooltipContent>
        </Tooltip>

        {/* Video */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={videoOn ? 'outline' : 'secondary'}
              size="icon"
              className={!videoOn ? 'bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-950/40 dark:text-red-400 dark:hover:bg-red-950/60' : ''}
              onClick={onToggleVideo}
            >
              {videoOn ? <Video className="size-4" /> : <VideoOff className="size-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>{videoOn ? 'Disattiva videocamera' : 'Attiva videocamera'}</TooltipContent>
        </Tooltip>

        {/* Screen Share */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={screenShare ? 'secondary' : 'outline'}
              size="icon"
              className={screenShare ? 'bg-blue-100 text-blue-600 hover:bg-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:hover:bg-blue-950/60' : ''}
              onClick={onToggleScreenShare}
            >
              {screenShare ? (
                <ScreenShareOff className="size-4" />
              ) : (
                <ScreenShare className="size-4" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {screenShare ? 'Interrompi condivisione' : 'Condividi schermo'}
          </TooltipContent>
        </Tooltip>

        {/* Notes */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={showNotes ? 'secondary' : 'outline'}
              size="icon"
              className={showNotes ? 'bg-amber-100 text-amber-600 hover:bg-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:hover:bg-amber-950/60' : ''}
              onClick={onToggleNotes}
            >
              <StickyNote className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {showNotes ? 'Nascondi note' : 'Note sessione'}
          </TooltipContent>
        </Tooltip>

        {/* Separator */}
        <div className="mx-1 h-8 w-px bg-border sm:mx-2" />

        {/* End Call */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="destructive"
              size="icon"
              className="size-10 rounded-full"
              onClick={onEndCall}
            >
              <PhoneOff className="size-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Termina chiamata</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  )
}
