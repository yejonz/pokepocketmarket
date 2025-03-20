import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
	"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/my_components/**/*.{js,ts,jsx,tsx,mdx}",
	"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	"./firebase/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		colors: {
    			background: 'rgb(var(--background))',
    			foreground: 'rgb(var(--foreground))',
    			card: {
    				DEFAULT: 'rgb(var(--card))',
    				foreground: 'rgb(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'rgb(var(--popover))',
    				foreground: 'rgb(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'rgb(var(--primary))',
    				foreground: 'rgb(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'rgb(var(--secondary))',
    				foreground: 'rgb(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'rgb(var(--muted))',
    				foreground: 'rgb(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'rgb(var(--destructive))',
    				foreground: 'rgb(var(--destructive-foreground))'
    			},
    			border: 'rgb(var(--border))',
    			input: 'rgb(var(--input))',
    			ring: 'rgb(var(--ring))',
    			chart: {
    				'1': 'rgb(var(--chart-1))',
    				'2': 'rgb(var(--chart-2))',
    				'3': 'rgb(var(--chart-3))',
    				'4': 'rgb(var(--chart-4))',
    				'5': 'rgb(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'accordion-down': {
    				from: {
    					height: '0'
    				},
    				to: {
    					height: 'var(--radix-accordion-content-height)'
    				}
    			},
    			'accordion-up': {
    				from: {
    					height: 'var(--radix-accordion-content-height)'
    				},
    				to: {
    					height: '0'
    				}
    			}
    		},
    		animation: {
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
