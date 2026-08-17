import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { ZoomIn, ZoomOut, RotateCw, RefreshCw } from 'lucide-react'

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  preview?: boolean
  className?: string
}

export const Image = ({
  src,
  alt,
  width,
  height,
  preview = false,
  className,
  style,
  onClick,
  ...rest
}: ImageProps) => {
  const [isPreviewOpen, setIsPreviewOpen] = useState(false)
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)

  const handleImageClick = (e: React.MouseEvent<HTMLImageElement>) => {
    if (preview) {
      setZoom(1)
      setRotation(0)
      setIsPreviewOpen(true)
    }
    if (onClick) {
      onClick(e)
    }
  }

  const handleZoomIn = () => setZoom((prev) => Math.min(3, +(prev + 0.25).toFixed(2)))
  const handleZoomOut = () => setZoom((prev) => Math.max(0.5, +(prev - 0.25).toFixed(2)))
  const handleReset = () => {
    setZoom(1)
    setRotation(0)
  }
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360)

  return (
    <>
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          'object-contain select-none',
          preview && 'cursor-pointer hover:opacity-90 transition-opacity',
          className
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style,
        }}
        draggable={false}
        onClick={handleImageClick}
        {...rest}
      />

      {preview && (
        <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
          <DialogContent className="max-w-4xl xl:max-w-5xl w-[92vw] max-h-[90vh] flex flex-col p-0 overflow-hidden rounded-2xl border-border bg-card shadow-2xl">
            <DialogHeader className="p-4 border-b border-border/70 flex flex-row items-center justify-between gap-4">
              <DialogTitle className="text-sm font-semibold truncate">
                {alt || 'Vista previa de imagen'}
              </DialogTitle>
              <div className="flex items-center gap-1.5 mr-6">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  disabled={zoom <= 0.5}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40"
                  title="Reducir zoom"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-2 py-0.5 text-xs font-semibold rounded bg-muted text-foreground"
                  title="Restablecer (100%)"
                >
                  {Math.round(zoom * 100)}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  disabled={zoom >= 3}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted disabled:opacity-40"
                  title="Aumentar zoom"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
                <div className="h-4 w-px bg-border mx-1" />
                <button
                  type="button"
                  onClick={handleRotate}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                  title="Girar 90°"
                >
                  <RotateCw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted"
                  title="Restablecer"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>
            </DialogHeader>
            <div className="flex-1 min-h-[50vh] max-h-[70vh] overflow-auto bg-zinc-950/90 flex items-center justify-center p-4">
              <img
                src={src}
                alt={alt}
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg)`,
                  transition: 'transform 0.2s ease-out',
                }}
                className="max-h-[65vh] max-w-full object-contain rounded shadow-lg select-none"
                draggable={false}
              />
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
