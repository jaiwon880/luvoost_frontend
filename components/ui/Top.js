import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";
import Weather from "../util/CurrentWeather";

const pages = ["Board", "Coupon", "Dateplan"];

export function LoginedRightSideNav() {
  const session = useSession();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (session.status === "authenticated") {
    return (
      <div style={{ display: "flex", alignItems: "center" }}>
        <Image
          src={session.data.user?.image}
          width="25"
          height="25"
          style={{ marginRight: 10, marginLeft: 10 }}
          alt="userImg"
        />
        <span
          style={{
            color: "#f783ac",
            marginRight: 10,
            cursor: "pointer",
            fontSize: "1.1rem",
          }}
          onClick={handleMenuOpen}
        >
          {session.data.user?.name} 님
        </span>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <MenuItem onClick={handleMenuClose}>
            <a
              href="/profile"
              style={{ fontFamily: "Chosunilbo_myungjo", color: "#f783ac" }}
            >
              Profile
            </a>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            <a
              href="/admin"
              style={{ fontFamily: "Chosunilbo_myungjo", color: "#f783ac" }}
            >
              Admin
            </a>
          </MenuItem>
        </Menu>
        <Button
          onClick={() => signOut()}
          color="inherit"
          sx={{
            fontFamily: "Chosunilbo_myungjo",
            color: "#f783ac",
            fontSize: "1.1rem",
          }}
        >
          로그아웃
        </Button>
      </div>
    );
  }
  return null;
}

export function LogoutedRightSideNav() {
  const session = useSession();
  if (session.status === "unauthenticated") {
    return (
      <Link href="/login">
        <Button
          style={{ color: "#f783ac" }}
          color="inherit"
          sx={{
            fontFamily: "Chosunilbo_myungjo",
            color: "#f783ac",
            marginLeft: 2,
            fontSize: "1.1rem",
          }}
        >
          로그인
        </Button>
      </Link>
    );
  }
}

export default function Top() {
  return (
    <AppBar sx={{ bgcolor: "#ffffff", width: "100%" }} position="static">
      <Toolbar
        sx={{
          justifyContent: "space-between",
          paddingLeft: "15%",
          paddingRight: "15%",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Link href="/" passHref>
            <Image src="./image/logo-text.png" alt="Logo" width={120} height={50} />
          </Link>
          <Weather />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          {pages.map((page) => {
            let buttonText = page;
            let linkPath = "/" + page.toLowerCase();
            // 네비게이션 한글화
            if (page === "Board") {
              buttonText = "커뮤니티";
            } else if (page === "Coupon") {
              buttonText = "쿠폰";
            } else if (page === "Dateplan") {
              buttonText = "코스 추천";
            }

            return (
              <Link key={page} href={linkPath} passHref>
                <Button
                  color="inherit"
                  sx={{
                    fontFamily: "Chosunilbo_myungjo",
                    color: "#f783ac",
                    marginLeft: 1,
                    fontSize: "1.1rem",
                  }}
                >
                  {buttonText}
                </Button>
              </Link>
            );
          })}
          <LogoutedRightSideNav />
          <LoginedRightSideNav />
        </div>
      </Toolbar>
    </AppBar>
  );
}
