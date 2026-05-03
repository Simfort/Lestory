"use client";
import { useEffect, useState } from "react";

export default function useCookie() {
  const [cookieStore, setCookieStore] = useState<Map<string, string>>(
    new Map(),
  );
  useEffect(() => {
    if (window) {
      const cookiesEntries = document.cookie.split(";").map((val) => {
        const cookieEntries = val.split("=");
        return cookieEntries as [string, string];
      });
      setCookieStore(new Map(cookiesEntries));
    }
  }, []);
  return cookieStore;
}
