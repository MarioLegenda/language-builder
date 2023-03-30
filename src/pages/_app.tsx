import '@/styles/globals.css';
import '@/styles/reset.css';
import { MantineProvider } from '@mantine/core';
import { NotificationsProvider } from '@mantine/notifications';
import { RecoilRoot, RecoilEnv } from 'recoil';
import type { AppProps } from 'next/app';

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export default function App({ Component, pageProps }: AppProps) {
	return (
		<MantineProvider
			withGlobalStyles
			withNormalizeCSS
			theme={{
				colorScheme: 'dark',
				loader: 'oval',
			}}>
			<NotificationsProvider position="top-right">
				<RecoilRoot>
					<Component {...pageProps} />
				</RecoilRoot>
			</NotificationsProvider>
		</MantineProvider>
	);
}
