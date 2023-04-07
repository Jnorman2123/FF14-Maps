import NavBar from './navBar'
import QuestInfoContainer from './questInfoContainer'
import ToggleContainer from './toggleContainer'

type LayoutProps = {
    children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      <br></br>
      <ToggleContainer />
      <main>{children}</main>
      <QuestInfoContainer />
    </>
  )
}