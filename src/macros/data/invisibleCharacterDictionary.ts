import { generateCharacterDictionary } from './characters';

// https://invisible-characters.com/ filtered as actually zero width
const codes = [
  173, 847, 1564, 6155, 6156, 6157, 8203, 8204, 8205, 8206, 8207, 8234, 8235,
  8236, 8237, 8238, 8288, 8289, 8290, 8291, 8292, 8294, 8295, 8296, 8297, 8298,
  8299, 8300, 8301, 8302, 8303, 56128, 56377, 65024, 65025, 65026, 65027, 65028,
  65029, 65030, 65031, 65032, 65033, 65034, 65035, 65036, 65037, 65038, 65039,
  65279, 119155, 119156, 119157, 119158, 119159, 119160, 119161, 119162, 917505,
  917536, 917537, 917538, 917539, 917540, 917541, 917542, 917543, 917544,
  917545, 917546, 917547, 917548, 917549, 917550, 917551, 917552, 917553,
  917554, 917555, 917556, 917557, 917558, 917559, 917560, 917561, 917562,
  917563, 917564, 917565, 917566, 917567, 917568, 917569, 917570, 917571,
  917572, 917573, 917574, 917575, 917576, 917577, 917578, 917579, 917580,
  917581, 917582, 917583, 917584, 917585, 917586, 917587, 917588, 917589,
  917590, 917591, 917592, 917593, 917594, 917595, 917596, 917597, 917598,
  917599, 917600, 917601, 917602, 917603, 917604, 917605, 917606, 917607,
  917608, 917609, 917610, 917611, 917612, 917613, 917614, 917615, 917616,
  917617, 917618, 917619, 917620, 917621, 917622, 917623, 917624, 917625,
  917626, 917627, 917628, 917629, 917630, 917631, 917760, 917761, 917762,
  917763, 917764, 917765, 917766, 917767, 917768, 917769, 917770, 917771,
  917772, 917773, 917774, 917775, 917776, 917777, 917778, 917779, 917780,
  917781, 917782, 917783, 917784, 917785, 917786, 917787, 917788, 917789,
  917790, 917791, 917792, 917793, 917794, 917795, 917796, 917797, 917798,
  917799, 917800, 917801, 917802, 917803, 917804, 917805, 917806, 917807,
  917808, 917809, 917810, 917811, 917812, 917813, 917814, 917815, 917816,
  917817, 917818, 917819, 917820, 917821, 917822, 917823, 917824, 917825,
  917826, 917827, 917828, 917829, 917830, 917831, 917832, 917833, 917834,
  917835, 917836, 917837, 917838, 917839, 917840, 917841, 917842, 917843,
  917844, 917845, 917846, 917847, 917848, 917849, 917850, 917851, 917852,
  917853, 917854, 917855, 917856, 917857, 917858, 917859, 917860, 917861,
  917862, 917863, 917864, 917865, 917866, 917867, 917868, 917869, 917870,
  917871, 917872, 917873, 917874, 917875, 917876, 917877, 917878, 917879,
  917880, 917881, 917882, 917883, 917884, 917885, 917886, 917887, 917888,
  917889, 917890, 917891, 917892, 917893, 917894, 917895, 917896, 917897,
  917898, 917899, 917900, 917901, 917902, 917903, 917904, 917905, 917906,
  917907, 917908, 917909, 917910, 917911, 917912, 917913, 917914, 917915,
  917916, 917917, 917918, 917919, 917920, 917921, 917922, 917923, 917924,
  917925, 917926, 917927, 917928, 917929, 917930, 917931, 917932, 917933,
  917934, 917935, 917936, 917937, 917938, 917939, 917940, 917941, 917942,
  917943, 917944, 917945, 917946, 917947, 917948, 917949, 917950, 917951,
  917952, 917953, 917954, 917955, 917956, 917957, 917958, 917959, 917960,
  917961, 917962, 917963, 917964, 917965, 917966, 917967, 917968, 917969,
  917970, 917971, 917972, 917973, 917974, 917975, 917976, 917977, 917978,
  917979, 917980, 917981, 917982, 917983, 917984, 917985, 917986, 917987,
  917988, 917989, 917990, 917991, 917992, 917993, 917994, 917995, 917996,
  917997, 917998, 917999,
] as const;

export async function generateInvisibleCharacterDictionary() {
  const dictionary = await generateCharacterDictionary();

  return Object.fromEntries(
    codes.map((code) => {
      return [code, dictionary[code] ?? `<unknown-${code.toString(16)}>`];
    }),
  );
}
