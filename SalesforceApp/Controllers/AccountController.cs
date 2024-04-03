using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using SalesforceApp.Services;

namespace SalesforceApp.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AccountController : ControllerBase
    {
        private const String API_ENDPOINT = "/services/apexrest/AccountService";
        private readonly ILogger<AccountController> _logger;

        public AccountController(ILogger<AccountController> logger)
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