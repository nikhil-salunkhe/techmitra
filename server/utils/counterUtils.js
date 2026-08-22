import Counter from '../models/Counter.js';
import BusinessEnquiry from '../models/BusinessEnquiry.js';

// Ensure a counter document exists for business enquiries. If business enquiries exist in DB, initialize
// the counter seq to the highest number found in existing BUS-<num> ids. This is safe to call multiple times.
export async function initializeBusinessCounter() {
  try {
    const highest = await BusinessEnquiry.findOne().sort({ id: -1 }).lean();
    if (!highest) {
      const existing = await Counter.findById('businessEnquiryId');
      if (!existing) {
        await Counter.create({ _id: 'businessEnquiryId', seq: 0 });
        console.log('✅ Initialized businessEnquiryId counter to 0 (no existing enquiries)');
      } else {
        console.log(`ℹ️ businessEnquiryId counter already exists at ${existing.seq}`);
      }
      return;
    }

    const match = (highest.id || '').match(/BUS-(\d+)/);
    const highestNumber = match ? parseInt(match[1], 10) : null;
    if (highestNumber !== null) {
      const counter = await Counter.findById('businessEnquiryId');
      if (!counter) {
        await Counter.create({ _id: 'businessEnquiryId', seq: highestNumber });
        console.log(`✅ Initialized businessEnquiryId counter to ${highestNumber} (from existing ${highest.id})`);
      } else {
        console.log(`ℹ️ businessEnquiryId counter already exists at ${counter.seq}`);
      }
    } else {
      console.log('ℹ️ No parsable BUS- IDs found to initialize business counter');
    }
  } catch (error) {
    console.error('⚠️ Error initializing business counter:', error);
  }
}
