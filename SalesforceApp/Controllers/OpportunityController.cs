using Microsoft.AspNetCore.Mvc;
using SalesforceApp.Services;

namespace SalesforceApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OpportunityController : ControllerBase
    {
        private const String API_ENDPOINT = "/services/apexrest/OpportunityService";
        private readonly ILogger<AccountController> _logger;

        public OpportunityController(ILogger<AccountController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public String Get()
        {
            var client = new SalesforceClient();
            client.login();
            return client.getRecords(API_ENDPOINT);
        }
    }
}
