import { Application, Device } from '@nativescript/core';
import { initializeAuth } from './services/auth.service';

// Global error handling
Application.on(Application.uncaughtErrorEvent, (args) => {
    if (global.isIOS) {
        console.log('Native error:', args.ios);
    } else if (global.isAndroid) {
        console.log('Native error:', args.android);
    }
    console.log('Error message:', args.error.message);
    console.log('Stack trace:', args.error.stack);
});

// Handle suspend and resume
Application.on(Application.suspendEvent, (args) => {
    console.log('Application suspended');
    // Save any necessary state here
});

Application.on(Application.resumeEvent, (args) => {
    console.log('Application resumed');
    // Restore state and reconnect services if needed
});

// Handle exit
Application.on(Application.exitEvent, (args) => {
    console.log('Application will exit');
    // Cleanup and save state
});

// Handle low memory
Application.on(Application.lowMemoryEvent, (args) => {
    console.log('Low memory warning');
    // Clear caches and free up memory
});

// Initialize core services
try {
    initializeAuth();
} catch (error) {
    console.error('Failed to initialize auth:', error);
}

// Set up orientation
if (global.isIOS) {
    const iosApp = UIApplication.sharedApplication;
    if (iosApp) {
        // Ensure the app stays active
        iosApp.idleTimerDisabled = true;
    }
}

Application.run({ moduleName: 'app-root' });