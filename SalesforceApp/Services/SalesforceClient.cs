using System.Net.Http;
using System.Net.Http.Headers;
using System.Net;
using Newtonsoft.Json;

namespace SalesforceApp.Services
{
    public class SalesforceClient
    {
        private const string LOGIN_ENDPOINT = "https://login.salesforce.com/services/oauth2/token";
        public string AuthToken { get; set; }
        public string InstanceUrl { get; set; }

        static SalesforceClient()
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls11 | SecurityProtocolType.Tls12;
        }

        public void login()
        {
            string jsonResponse;
            using (var client = new HttpClient())
            {
                var configuration = new ConfigurationBuilder().AddJsonFile("appsettings.json").Build();
                var request = new FormUrlEncodedContent(new Dictionary<string, string>
                {
                    {"grant_type", "password"},
                    {"client_id", configuration.GetValue<string>("AppSettings:clientId")},
                    {"client_secret", configuration.GetValue<string>("AppSettings:clientSecret")},
                    {"username", configuration.GetValue<string>("AppSettings:username")},
                    {"password", configuration.GetValue<string>("AppSettings:password")+configuration.GetValue<string>("AppSettings:token")}
                });
                request.Headers.Add("X-PreetyPrint", "1");

                var response = client.PostAsync(LOGIN_ENDPOINT, request).Result;
                jsonResponse = response.Content.ReadAsStringAsync().Result;
            }

            var values = JsonConvert.DeserializeObject<Dictionary<string, string>>(jsonResponse);
            AuthToken = values["access_token"];
            InstanceUrl = values["instance_url"];

        }

        public string getRecords(string apiEndpoint)
        {
            using (var client = new HttpClient())
            {
                string restRequest = InstanceUrl + apiEndpoint;
                var request = new HttpRequestMessage(HttpMethod.Get, restRequest);
                request.Headers.Add("Authorization", "Bearer " + AuthToken);
                request.Headers.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                request.Headers.Add("X-PreetyPrint", "1");
                var response = client.SendAsync(request).Result;
                return response.Content.ReadAsStringAsync().Result;
            }
        }
    }
}
