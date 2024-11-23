import app from './src/app.js';

const index = app;
const PORT = 3000;

index.listen(PORT, () => {
    console.log(`🚀 Server listen on port: ${PORT}`);
});