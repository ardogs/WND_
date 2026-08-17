import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { TitleBar } from '../organisms'

export const WNDLayout = memo(() => {
  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden select-none">
      {/* Title Bar Header */}
      <header className="h-[48px] w-full bg-card/95 backdrop-blur border-b border-border/70 flex-shrink-0 flex items-center z-50 px-2">
        <TitleBar />
      </header>

      {/* Main App Content */}
      <main className="flex-1 p-3 sm:p-4 md:p-5 pt-3 sm:pt-4 overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 bg-card rounded-2xl border border-border/70 shadow-soft flex flex-col overflow-hidden min-h-0">
          <div className="flex-1 h-full w-full overflow-y-auto px-5 sm:px-8 lg:px-10 pt-7 sm:pt-9 md:pt-10 pb-8 sm:pb-10 scroll">
            <div className="w-full h-full max-w-[1536px] 2xl:max-w-[1600px] mx-auto flex flex-col">
              <Outlet />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
})
WNDLayout.displayName = 'WNDLayout'