using System.Text.RegularExpressions;

namespace backend.Utils;

public class SlugGenerator
{
    public static string CreateSlug(string title)
    {
        string slug = title.Trim().ToLowerInvariant();

        // Replace sequences of unsupported characters with a hyphen.
        slug = Regex.Replace(slug, @"[^a-z0-9_-]+", "-");

        // Collapse repeated hyphens and trim them from the ends.
        slug = Regex.Replace(slug, @"-+", "-").Trim('-');

        return slug;
    }
}

