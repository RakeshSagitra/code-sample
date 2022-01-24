import Responder from '../../server/expressResponder'
import {
  DeleteFlowFieldService,
  SaveFlowFieldService,
  AddFlowPageService,
  EditFlowPageService,
  DeleteFlowPageService,
  GetFlowsService,
  GetEmailTemplatesService,
  CheckAuthorizationService,
  AddFlowService,
  EditFlowService,
  DeleteFlowService,
  GetACDQueueService,
  CopyFlowService,
  GetFlowPagesByFlowIdService,
  GetFlowFieldsByFlowIdService,
  GetDispositionsService,
  SaveLeadService,
  CheckUserStatusService,
  PerformActionService,
  DispoHouseholdingRecordService,
  GetHouseholdingRecordsService,
  GetLeadService
} from '../services/flow'
import config from '../../config/app'

export default class FlowController {
  static async checkAuthorization (req, res) {
    const appPath = config.get('flow.path')
    const checkAuthorizationResult = await CheckAuthorizationService.execute({
      userId: req.body.user_id,
      appPath,
      user: req.body.user
    })
    if (checkAuthorizationResult.successful) {
      Responder.success(res, checkAuthorizationResult.result)
    } else {
      Responder.failed(res, checkAuthorizationResult.errors)
    }
  }

  static async deleteFlowField (req, res) {
    const deleteFlowFieldResult = await DeleteFlowFieldService.execute({ ...req.query, ...req.body })
    if (deleteFlowFieldResult.successful) {
      Responder.success(res, deleteFlowFieldResult.result)
    } else {
      Responder.failed(res, deleteFlowFieldResult.errors)
    }
  }

  static async saveFlowField (req, res) {
    const saveFlowFieldResult = await SaveFlowFieldService.execute({ ...req.body, ...req.query })
    if (saveFlowFieldResult.successful) {
      Responder.success(res, saveFlowFieldResult.result)
    } else {
      Responder.failed(res, saveFlowFieldResult.errors)
    }
  }

  static async addFlowPage (req, res) {
    const addFlowPageResult = await AddFlowPageService.execute({ ...req.body, ...req.query })
    if (addFlowPageResult.successful) {
      Responder.success(res, addFlowPageResult.result)
    } else {
      Responder.failed(res, addFlowPageResult.errors)
    }
  }

  static async editFlowPage (req, res) {
    const editFlowPageResult = await EditFlowPageService.execute({ ...req.body, ...req.query })
    if (editFlowPageResult.successful) {
      Responder.success(res, editFlowPageResult.result)
    } else {
      Responder.failed(res, editFlowPageResult.errors)
    }
  }

  static async deleteFlowPage (req, res) {
    const deleteFlowPageResult = await DeleteFlowPageService.execute({
      ...req.params,
      user: req.body.user
    })
    if (deleteFlowPageResult.successful) {
      Responder.success(res, deleteFlowPageResult.result)
    } else {
      Responder.failed(res, deleteFlowPageResult.errors)
    }
  }

  static async getFlows (req, res) {
    const getFlowsResult = await GetFlowsService.execute({ user: req.body.user })
    if (getFlowsResult.successful) {
      Responder.success(res, getFlowsResult.result)
    } else {
      Responder.failed(res, getFlowsResult.errors)
    }
  }

  static async getEmailTemplates (req, res) {
    const getEmailTemplatesResult = await GetEmailTemplatesService.execute({ user: req.body.user })
    if (getEmailTemplatesResult.successful) {
      Responder.success(res, getEmailTemplatesResult.result)
    } else {
      Responder.failed(res, getEmailTemplatesResult.errors)
    }
  }

  static async addFlow (req, res) {
    const addFlowResult = await AddFlowService.execute({ ...req.body, ...req.query })
    if (addFlowResult.successful) {
      Responder.success(res, addFlowResult.result)
    } else {
      Responder.failed(res, addFlowResult.errors)
    }
  }

  static async editFlow (req, res) {
    const editFlowResult = await EditFlowService.execute({ ...req.body, ...req.query })
    if (editFlowResult.successful) {
      Responder.success(res, editFlowResult.result)
    } else {
      Responder.failed(res, editFlowResult.errors)
    }
  }

  static async deleteFlow (req, res) {
    const deleteFlowResult = await DeleteFlowService.execute({ ...req.params, user: req.body.user })
    if (deleteFlowResult.successful) {
      Responder.success(res, deleteFlowResult.result)
    } else {
      Responder.failed(res, deleteFlowResult.errors)
    }
  }

  static async getACDQueues (req, res) {
    const acdQueueResult = await GetACDQueueService.execute({ ...req.body, ...req.query })
    if (acdQueueResult.successful) {
      Responder.success(res, acdQueueResult.result)
    } else {
      Responder.failed(res, acdQueueResult.errors)
    }
  }

  static async copyFlow (req, res) {
    const copyFlowResult = await CopyFlowService.execute({ ...req.body, ...req.query })
    if (copyFlowResult.successful) {
      Responder.success(res, copyFlowResult.result)
    } else {
      Responder.failed(res, copyFlowResult.errors)
    }
  }

  static async getCurrentUserId (req, res) {
    const user_id = req.body.user_id
    if (user_id) {
      Responder.success(res, { user_id })
    } else {
      Responder.failed(res)
    }
  }

  static async getFlowPagesByFlowId (req, res) {
    const getFlowPagesByFlowIdResult = await GetFlowPagesByFlowIdService.execute({ ...req.body, ...req.query })
    if (getFlowPagesByFlowIdResult.successful) {
      Responder.success(res, getFlowPagesByFlowIdResult.result)
    } else {
      Responder.failed(res, getFlowPagesByFlowIdResult.errors)
    }
  }

  static async getFlowFieldsByFlowId (req, res) {
    const getFlowFieldsByFlowIdResult = await GetFlowFieldsByFlowIdService.execute({
      ...req.query,
      userId: req.body.user_id
    })
    if (getFlowFieldsByFlowIdResult.successful) {
      Responder.success(res, getFlowFieldsByFlowIdResult.result)
    } else {
      Responder.failed(res, getFlowFieldsByFlowIdResult.errors)
    }
  }

  static async getDispositions (req, res) {
    const getDispositionsResult = await GetDispositionsService.execute({ ...req.body, ...req.query })
    if (getDispositionsResult.successful) {
      Responder.success(res, getDispositionsResult.result)
    } else {
      Responder.failed(res, getDispositionsResult.errors)
    }
  }

  static async saveLead (req, res) {
    const saveLeadResult = await SaveLeadService.execute({ lead: req.body.lead })
    if (saveLeadResult.successful) {
      Responder.success(res, saveLeadResult.result)
    } else {
      Responder.failed(res, saveLeadResult.errors)
    }
  }

  static async checkUserStatus (req, res) {
    const checkUserStatusResult = await CheckUserStatusService.execute({ ...req.body, ...req.query })
    if (checkUserStatusResult.successful) {
      Responder.success(res, checkUserStatusResult.result)
    } else {
      Responder.failed(res, checkUserStatusResult.errors)
    }
  }

  static async performAction (req, res) {
    const performActionResult = await PerformActionService.execute({ ...req.body, ...req.query })
    if (performActionResult.successful) {
      Responder.success(res, performActionResult.result)
    } else {
      Responder.failed(res, performActionResult.errors)
    }
  }

  static async dispoHouseholdingRecord (req, res) {
    const dispoHouseholdingRecordResult = await DispoHouseholdingRecordService.execute({ ...req.body, ...req.query })
    if (dispoHouseholdingRecordResult.successful) {
      Responder.success(res, dispoHouseholdingRecordResult.result)
    } else {
      Responder.failed(res, dispoHouseholdingRecordResult.errors)
    }
  }

  static async getHouseholdingRecords (req, res) {
    const householdingRecordsResult = await GetHouseholdingRecordsService.execute({ ...req.body, ...req.query })
    if (householdingRecordsResult.successful) {
      Responder.success(res, householdingRecordsResult.result)
    } else {
      Responder.failed(res, householdingRecordsResult.errors)
    }
  }

  static async getLead (req, res) {
    const getLeadResult = await GetLeadService.execute({ ...req.body, ...req.query })
    if (getLeadResult.successful) {
      Responder.success(res, getLeadResult.result)
    } else {
      Responder.failed(res, getLeadResult.errors)
    }
  }
}
