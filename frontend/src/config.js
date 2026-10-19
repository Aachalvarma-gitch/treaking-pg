const config={
    BACKEND_URL:import.meta.env.VITE_NODE_ENV==='development'
    ?import.meta.env.VITE_BACKEND_LOCAL_URL
    :import.meta.env.VITE_BACKEND_LIVE_URL
}
export default config