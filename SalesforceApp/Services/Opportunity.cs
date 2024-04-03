namespace SalesforceApp.Services
{
    public class Opportunity : SObject
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string? AccountId { get; set; }

    }
}
