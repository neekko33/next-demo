import Link from "next/link"
import logoImg from "@/assets/logo.png"
import Image from "next/image"
import MainHeaderBackground from "./main-header-background"
import classes from './main-header.module.css'
import NavLink from "./nav-link"

export default function MainHeader() {

  return (
    <>
      <header className={classes.header}>
        <Link href="/" className={classes.logo}>
          <Image width={80} height={80} src={logoImg.src} alt="A plate with food on it" priority />
          NextLevel Food
        </Link>
        <nav className={classes.nav}>
          <ul className="flex items-center gap-4 text-2xl">
            <li>
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
      <MainHeaderBackground />
    </>
  )
}