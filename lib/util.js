import * as constants from '../config/constants';

export async function loadConstants() {
    const res = {
        network_params: {
            MUMBAI_TESTNET: {
                MUMBAI_TESTNET_PARAMS: constants.MUMBAI_TESTNET_PARAMS,
                MUMBAI_TESTNET_NETWORK_VERSION: constants.MUMBAI_TESTNET_NETWORK_VERSION,
            }
        },
        NETWORK_SWITCH_REJECT_ERROR_CODE: constants.NETWORK_SWITCH_REJECT_ERROR_CODE,
        NETWORK_SWITCH_REJECT_FEEDBACK_MSG: constants.NETWORK_SWITCH_REJECT_FEEDBACK_MSG
    }
    
    return res;
}