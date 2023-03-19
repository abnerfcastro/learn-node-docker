declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: 'development' | 'production'
            PORT?: number
            HOSTNAME: string
        }
    }
}

export {}