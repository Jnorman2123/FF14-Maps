import NavBar from './navBar'
import QuestInfoContainer from './questInfoContainer'
import ToggleContainer from './toggleContainer'

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className='space-y-sm'>
      <NavBar />
      <div className='grid grid-cols-12 gap-2'>
        <ToggleContainer />
        <main  className='col-span-6'>{children}</main>
        <QuestInfoContainer />
      </div>
    </div>
  )
}