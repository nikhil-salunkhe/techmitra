*** Begin Patch
*** Update File: server/server.js
@@
-import { Resend } from 'resend';
+// Resend client moved to server/services/resendClient.js
@@
-import Enrollment from './models/Enrollment.js';
-import Counter from './models/Counter.js';
-import Subscription from './models/Subscription.js';
-import BusinessEnquiry from './models/BusinessEnquiry.js';
+import Enrollment from './models/Enrollment.js';
+import Counter from './models/Counter.js';
+import Subscription from './models/Subscription.js';
+import BusinessEnquiry from './models/BusinessEnquiry.js';
+
+// Import shared resend client and business-email utilities
+import { resend } from './services/resendClient.js';
+import {
+  sendBusinessEnquiryEmail as sendBusinessEmailFromService,
+  sendBusinessEnquiryNotificationToAdmin as sendBusinessAdminFromService,
+} from './services/businessEmail.js';
+import { initializeBusinessCounter as initializeBusinessCounterFromUtil } from './utils/counterUtils.js';
@@
-mongoose.connection.once('open', () => {
-  initializeEnrollmentCounter();
-  initializeBusinessCounter();
-});
+mongoose.connection.once('open', () => {
+  initializeEnrollmentCounter();
+  // initialize business counter (if needed)
+  initializeBusinessCounterFromUtil();
+});
@@
-app.use(cors());
+// Configure CORS to allow production frontend origins + existing Netlify testing URL.
+const allowedOrigins = [
+  process.env.FRONTEND_URL || 'https://techmitr.netlify.app',
+  'https://techmitr.in',
+  'https://www.techmitr.in',
+];
+
+app.use(cors({
+  origin: (origin, callback) => {
+    // allow requests with no origin (e.g., server-to-server, curl)
+    if (!origin) return callback(null, true);
+    if (allowedOrigins.includes(origin)) return callback(null, true);
+    return callback(new Error('Not allowed by CORS'));
+  },
+  credentials: true,
+}));
*** End Patch
