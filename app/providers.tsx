"use client";

import * as React from "react";
import { NextUIProvider } from "@nextui-org/system";
import { useRouter } from 'next/navigation'
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProviderProps } from "next-themes/dist/types";
import { Session } from "next-auth";
import { SessionProvider } from 'next-auth/react';
import { AppContextProvider } from "@/context/page";

export interface ProvidersProps {
	children: React.ReactNode;
	themeProps?: ThemeProviderProps;
	session?: Session | null;
}

export function Providers({ children, themeProps, session }: ProvidersProps) {
  const router = useRouter();

	return (
		<SessionProvider session={session}>
			<AppContextProvider>
				<NextUIProvider navigate={router.push}>
					<NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
				</NextUIProvider>
			</AppContextProvider>
		</SessionProvider>
	);
}
