namespace SalesforceApp.Services
{
    public class Account : SObject
    {
        public string? AccountNumber { get; set; }

        public string Name { get; set; }

        public bool Active { get; set; }

        public DateTime CreatedDate { get; set; }
    }
}
